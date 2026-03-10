import * as WebSocket from 'ws';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { LsxMessage, Request, Response } from '@phobos-lsx/protocol';

import { v4 as uuidv4 } from 'uuid';

import { Subject } from 'rxjs';
import { Ws } from './common/interfaces/ws';
import { HttpAdapterHost } from '@nestjs/core';
import { WinstonLogger } from './infrastructure/logger/winston/winston.logger';
import { AuthService } from './infrastructure/auth/auth.service';
import { IncomingMessage } from 'http';
import { Stream } from 'stream';

@WebSocketGateway({path: '/api'})
export class AppGateway {
  protected activeClients: Map<string, Ws> = new Map<string, Ws>();
  protected requests: Map<string, (value: Response) => void> = new Map<string, (value: Response) => void>();

  public onMessage: Subject<LsxMessage> = new Subject<LsxMessage>();
  public onRequest: Subject<{client: Ws, msgId: string, request: Request}> = new Subject<{client: Ws, msgId: string, request: Request}>();

  @WebSocketServer() server: WebSocket.Server;

  constructor(
    private readonly auth: AuthService,
    private readonly logger: WinstonLogger,
    private readonly http: HttpAdapterHost
  ) {
    this.logger.setContext('AppGateway');
  }

  onModuleInit() {
    const server = this.http.httpAdapter.getHttpServer();

    server.removeAllListeners('upgrade');
    server.on('upgrade', this.handleUpgrade.bind(this));
  }

  @SubscribeMessage('msg')
  public handleMessage(client: Ws, payload: string): void {
    const msg = LsxMessage.fromJSON(JSON.parse(payload));

    if(msg.request) {
        this.onRequest.next({client: client, msgId: msg.id, request: msg.request});
    }

    if(msg.response) {
        if(this.requests.has(msg.id)) {
            this.requests.get(msg.id)!(msg.response);
            this.requests.delete(msg.id);
        }
    }
    this.onMessage.next(msg);
  }

  handleDisconnect(client: Ws) {
    this.activeClients.delete(client.id);
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Ws, ...args: any[]) {
    const urlParams = new URLSearchParams(args[0].url.split('?')[1]);

    client.token = urlParams.get('token');
    client.id = uuidv4();
    
    this.activeClients.set(client.id, client);
    this.logger.log(`Client connected: ${client.id}`);
  }

  /**
   * Sends a request to a specific client.
   * @param clientId The uuid of the client.
   * @param req The request object.
   * @returns A promise that resolves with the response.
   */
  public async request(clientId: string, req: Request): Promise<Response> {
    return new Promise((resolve, reject) => {
        const msg: LsxMessage = {
            id: uuidv4(),
            request: req
      }

      this.requests.set(msg.id, resolve.bind(this));
      setTimeout(this.rejectOnTimeout.bind(this, msg.id, reject), 5000);
      this.sendToClient(this.activeClients.get(clientId), msg);
    });
  }

  /**
   * Sends a request to all clients.
   * @param req The request object.
   * @returns A promise that resolves with an array of responses.
   */
  public async requestAll(req: Request) {
    const requests: Promise<Response>[] = [];
    for (const [id, activeClient] of this.activeClients) {
      requests.push(this.request(activeClient.id, req))
    }

    return Promise.allSettled(requests);
  }

  /**
   * Sends a request to all clients except the specified one.
   * @param clientId The uuid of the client to exclude.
   * @param req The request object.
   * @returns A promise that resolves with an array of responses.
   */
  public async requestAllButOne(clientId: string, req: Request) {
    const requests: Promise<Response>[] = [];
    for (const [id, activeClient] of this.activeClients) {
      if (activeClient.id != clientId) {
        requests.push(this.request(activeClient.id, req))
      }
    }

    return Promise.allSettled(requests);
  }

  /**
   * Sends the response message to the client.
   * @param clientId The uuid of the client.
   * @param msgId The uuid of the message.
   * @param res The response object.
   */
  public respond(clientId: string, msgId: string, res: Response) {
    const msg: LsxMessage = {
        id: msgId,
        response: res
    }
    this.sendToClient(this.activeClients.get(clientId), msg);
  }

  /**
   * Sends the error response message to the client.
   * @param clientId The uuid of the client.
   * @param msgId The uuid of the message.
   * @param err The error object.
   */
  public error(clientId: string, msgId: string, err: Error) {
    const msg: LsxMessage = {
        id: msgId,
        error: {type: err.name, message: err.message}
    }
    this.sendToClient(this.activeClients.get(clientId), msg);
  }

  protected rejectOnTimeout(id: string, reject: (reason?: any) => void) {
    if(this.requests.delete(id)) {
        reject();
    }
  }

  protected sendToAllClients(msg: LsxMessage) {
    for (const [id, client] of this.activeClients) {
      this.sendToClient(client, msg);
    }
  }

  protected sendToClient(client: Ws, msg: LsxMessage) {
    const buffer = {event: 'msg', data: JSON.stringify(LsxMessage.toJSON(msg))};
    client.send(JSON.stringify(buffer))
  }


  /**
   * Handles the WebSocket upgrade request.
   * @param request The HTTP request.
   * @param socket The WebSocket connection.
   * @param head The head of the WebSocket request.
   */
  private async handleUpgrade(request: IncomingMessage, socket: Stream.Duplex, head: Buffer) {
    const urlParams = new URLSearchParams(request.url?.split('?')[1]);
    const token = urlParams.get('token');

    if (!token || !(await this.auth.validateToken(token))) {
      this.logger.warn(`Unauthorized connection attempt from ${request.socket.remoteAddress || 'unknown'}`);
      socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
      socket.destroy();
    } else {
      this.server.handleUpgrade(request, socket, head, (client: WebSocket, request: IncomingMessage) => {
        this.server.emit('connection',  client, request);
      });
    }
  }
}
