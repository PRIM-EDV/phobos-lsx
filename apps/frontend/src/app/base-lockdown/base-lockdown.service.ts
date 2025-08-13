import { Injectable } from '@angular/core';
import { Request, Response } from 'proto/lsx';
import { LockdownState } from 'proto/lsx.lockdown';
import { BackendService } from '../backend/backend.service';

@Injectable({
  providedIn: 'root'
})
export class BaseLockdownService {

  constructor(private readonly backend: BackendService) { }

  public async getLockdownState(): Promise<LockdownState> {
    const req: Request = {
        getLockdownState: {}
    }

    const res: Response = await this.backend.request(req);
    return res.getLockdownState!.state!;
  }

  public async setLockdownState(state: LockdownState): Promise<void> {
    const req: Request = {
        setLockdownState: {state: state}
    }

    const res: Response = await this.backend.request(req);
  }

  public async getAutoLockdown(): Promise<boolean> {
    const req: Request = {
        getAutoLockdown: {}
    }

    const res: Response = await this.backend.request(req);
    return res.getAutoLockdown!.state!;
  }

  public async setAutoLockdown(state: boolean): Promise<void> {
    const req: Request = {
        setAutoLockdown: {state: state}
    }

    const res: Response = await this.backend.request(req);
  }

  public async getLockdownAnnouncements(): Promise<boolean> {
    const req: Request = {
        getLockdownAnnouncements: {}
    }

    const res: Response = await this.backend.request(req);
    return res.getLockdownAnnouncements!.state!;
  }

  public async setLockdownAnnouncements(state: boolean): Promise<void> {
    const req: Request = {
        setLockdownAnnouncements: {state: state}
    }

    const res: Response = await this.backend.request(req);
  }
}
