import { Injectable } from "@angular/core";

import { v4 as uuidv4 } from 'uuid';
import { Subject } from "rxjs";
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

import { LsxMessage, Request, Response, Error } from "proto/lsx";
import { Router } from "@angular/router";

const LSX_SERVER_HOSTNAME = window?.__env?.lsxServerHostname != null ? `${window.__env.lsxServerHostname}` : window.location.hostname;
const LSX_SERVER_PORT = window?.__env?.lsxServerPort != null ? window.__env.lsxServerPort : window.location.port;

const REST_API_URL = `http://${window.location.host}`;
const WS_URL = `ws://${LSX_SERVER_HOSTNAME}:${LSX_SERVER_PORT}`;

@Injectable({providedIn: 'root'})
export class BackendService {
    public isConnected: boolean = false;

    public onRequest: Subject<{id: string, request: Request}> = new Subject<{id: string, request: Request}>();
    public onMessage: Subject<LsxMessage> = new Subject<LsxMessage>();
    public onOpen: Subject<void> = new Subject<void>();
    public onClose: Subject<void> = new Subject<void>();

    private requests: Map<string, (value: Response) => void> = new Map<string, (value: Response) => void>();
    private errors: Map<string, (value: Error) => void> = new Map<string, (value: Error) => void>();
    private ws!: WebSocketSubject<any>;

    constructor(private readonly router: Router) {}

    public async connect(jwt: string) {
        this.ws = webSocket({url: `${WS_URL}?token=${jwt}`, openObserver: { next: () => {this.isConnected= true; this.onOpen.next()} }});

        this.ws.subscribe({
            next: this.handleMessage.bind(this),
            error: (err) => {console.log(err), this.router.navigateByUrl('/auth'); this.isConnected = false;},
            complete: this.handleClose.bind(this)
        });
    }

    public async disconnect() {
        this.ws.complete();
    }

    public refresh(token: string): void {
        this.ws.next({event: 'token', data: token});
    }

    public async getAnnouncementFiles(): Promise<string[]> {
        const req: Request = {
            getAnnouncementFiles: {}
        }

        const res: Response = await this.request(req);
        return res.getAnnouncementFiles!.files!;
    }

    public request(req: Request): Promise<Response> {
        return new Promise((resolve, reject) => {
            const msg: LsxMessage = {
                id: uuidv4(),
                request: req
            }

            this.requests.set(msg.id, resolve.bind(this));
            this.errors.set(msg.id, reject.bind(this));

            setTimeout(this.rejectOnTimeout.bind(this, msg.id, reject), 5000);
            this.ws.next({event: 'msg', data: JSON.stringify(LsxMessage.toJSON(msg))});
        });

    }

    public respond(id: string, res: Response) {
        const msg: LsxMessage = {
            id: id,
            response: res
        }
        this.ws.next({event: 'msg', data: JSON.stringify(LsxMessage.toJSON(msg))});
    }

    private handleMessage(buffer: {event: 'msg', data: string}) {
        const msg = LsxMessage.fromJSON(JSON.parse(buffer.data));

        if(msg.request) {
            this.onRequest.next({id: msg.id, request: msg.request});
        }

        if(msg.response) {
            if(this.requests.has(msg.id)) {
                this.requests.get(msg.id)!(msg.response);
                this.requests.delete(msg.id);
                this.errors.delete(msg.id);
            }
        }

        if(msg.error) {
            if(this.requests.has(msg.id)) {
                this.errors.get(msg.id)!(msg.error);
                this.requests.delete(msg.id);
                this.errors.delete(msg.id);
            }
        }

        this.onMessage.next(msg);
    }

    private handleClose() {
        this.onClose.next();
    }

    private rejectOnTimeout(id: string, reject: (reason?: any) => void) {
        if(this.requests.delete(id)) {
            reject();
        };
    }
}
