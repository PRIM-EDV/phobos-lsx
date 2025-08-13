import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";
import { BackendService } from '../backend/backend.service';
import { Router } from '@angular/router';

const LSX_SERVER_HOSTNAME = window?.__env?.lsxServerHostname != null ? `${window.__env.lsxServerHostname}` : window.location.hostname;
const LSX_SERVER_PORT = window?.__env?.lsxServerPort != null ? window.__env.lsxServerPort : window.location.port;

@Injectable()
export class AuthService {

    public role: string = "";
    private token: string = "";
    private refreshInterval: any;

    constructor(
        private readonly backend: BackendService,
        private readonly http: HttpClient,
        private readonly router: Router,
    ) {}

    public async login(username: string, password: string): Promise<void> {
        const token = await this.requestJwt(username, password);
        const payload = jwtDecode(token) as any;

        this.token = token;
        this.role = payload.role;

        await this.backend.connect(token);
        this.refreshInterval = setInterval(async () => { 
            try {
                await this.refreshJwt();
            } catch (err) { 
                console.error(err);
                await this.logout();
                await this.router.navigateByUrl('/auth');
            }
        }, 5000);
    }

    public async logout(): Promise<void> {
        this.token = '';
        this.role = '';

        clearInterval(this.refreshInterval);
        await this.backend.disconnect();
    }

    private async refreshJwt(): Promise<void> {
        const route = `${window.location.protocol}//${LSX_SERVER_HOSTNAME}:${LSX_SERVER_PORT}/api/auth/refresh`;
        const headers = { Authorization: `Bearer ${this.token}` };
        return new Promise<void>((resolve, reject) => {
            console.log(`${new Date()} refreshing token`);
            this.http.post<{ access_token: string }>(route, {access_token: this.token}, {headers: headers}).subscribe({
                next: (res) => {
                    this.token = res.access_token;
                    this.backend.refresh(res.access_token);
                    resolve();
                },
                error: (err) => {
                    console.error(err);
                    reject(err);
                }
             });
        });
    }

    public async requestJwt(username: string, password: string): Promise<string> {
        const data = { username: username, password: password };
        const route = `${window.location.protocol}//${LSX_SERVER_HOSTNAME}:${LSX_SERVER_PORT}/api/auth/login`;

        return new Promise<string>((resolve, reject) => {
            this.http.post<{ access_token: string }>(route, data).subscribe({
                next: (res) => {
                    resolve(res.access_token);
                },
                error: (err) => {
                    reject(err);
                }
            })
        });
    }

    public isAuthenticated(): boolean {
        return this.token != '';
    }
}
