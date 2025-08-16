import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Subject } from "rxjs";
import { LoggingService } from "src/app/core/logging/logging.service";

import * as WebSocket from "ws"
@Injectable()
export class QlcWebsocketService {

  public onOpen: Subject<void> = new Subject<void>();
  public onClosed: Subject<void> = new Subject<void>();

  private ws: WebSocket;
  private wsUrl: string;
  private requests: Map<string, (data: string[]) => void> = new Map<string, (data: string[]) => void>();

  constructor(
    private readonly config: ConfigService,
    private readonly log: LoggingService
  ) {
    this.wsUrl = this.config.get<string>('QLCPLUS_WS_URL') || 'ws://localhost:9999/qlcplusWS';
    this.connectWebsocket();
  }

  public async getQlcValue(cmd: string, params = ''): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
      this.requests.set(cmd, resolve);
      this.ws.send(`QLC+API|${cmd}${params}`);
      setTimeout(this.rejectOnTimeout.bind(this, cmd, reject), 5000)
    });
  }

  public async setQlcValue(msg: string) {
    if (this.ws.readyState == WebSocket.OPEN) {
      this.ws.send(msg);
    }
  }

  private onConnectionError() {
    setTimeout(this.reconnectWebsocket.bind(this), 5000);
  }

  private onConnectionClosed() {
    this.log.info(`Could not connect to ${this.wsUrl} retrying...`)
    setTimeout(this.reconnectWebsocket.bind(this), 5000);
    this.onClosed.next();
  }

  private onConnectionSuccess() {
    this.log.info(`Connected to ${this.wsUrl}`);
    this.onOpen.next();
  }

  private onMessage(message: Uint8Array) {
    const payload = String.fromCharCode.apply(null, new Uint16Array(message)).split('|') as string[];
    console.log(payload)
    if (payload[0] == "QLC+API") {
      const cmd = payload[1];
      if (this.requests.has(cmd)) {
        this.requests.get(cmd)(payload.slice(2));
        this.requests.delete(cmd);
      }
    }
  }

  private reconnectWebsocket() {
    if (!this.ws || this.ws.readyState == WebSocket.CLOSED) {
      this.connectWebsocket();
    }
  }

  private connectWebsocket() {
    this.ws = new WebSocket(this.wsUrl);
    this.ws.on('error', this.onConnectionError.bind(this));
    this.ws.on('close', this.onConnectionClosed.bind(this));
    this.ws.on('open', this.onConnectionSuccess.bind(this));
    this.ws.on('message', this.onMessage.bind(this));
  }

  private rejectOnTimeout(id: string, reject: (reason?: any) => void) {
    if (this.requests.delete(id)) {
      reject();
    }
  }


}
