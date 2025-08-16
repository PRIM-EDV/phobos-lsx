import { effect, Injectable, signal, WritableSignal } from '@angular/core';
import { LockdownState, Request, Response } from '@phobos-lsx/protocol';
import { LsxGateway } from '../../infrastructure/lsx.gateway';
import { BaseLockdownRpcAdapter } from './rpc/base-lockdown.rpc.adapter';

@Injectable({
  providedIn: 'root'
})
export class BaseLockdownService {

  public autoLockdown: WritableSignal<boolean> = signal(true);
  public lockdownAnnouncements: WritableSignal<boolean> = signal(true);
  public lockdownState: WritableSignal<LockdownState> = signal(LockdownState.LOCKDOWN_STATE_NORMAL);

  autoStateInit = effect(async () => {
    if (this.gateway.isConnected()) {
      this.autoLockdown.set(await this.rpc.getAutoLockdown());
      this.lockdownAnnouncements.set(await this.rpc.getLockdownAnnouncements());
      this.lockdownState.set(await this.rpc.getLockdownState());
    }
  });

  constructor(
    private readonly gateway: LsxGateway,
    private readonly rpc: BaseLockdownRpcAdapter
  ) { }

  public async updateAutoLockdown(state: string): Promise<void> {
    const autoLockdownState = state === 'on' ? true : false;
    await this.rpc.setAutoLockdown(autoLockdownState);
    this.autoLockdown.set(autoLockdownState);
  }

  public async updateLockdownAnnouncements(state: string): Promise<void> {
    const lockdownAnnouncementsState = state === 'on' ? true : false;
    await this.rpc.setLockdownAnnouncements(lockdownAnnouncementsState);
    this.lockdownAnnouncements.set(lockdownAnnouncementsState);
  }

  public async updateLockdownState(state: string): Promise<void> {
    switch (state) {
      case 'lockdown':
        await this.rpc.setLockdownState(LockdownState.LOCKDOWN_STATE_LOCKDOWN);
        this.lockdownState.set(LockdownState.LOCKDOWN_STATE_LOCKDOWN);
        break;
      case 'normal':
        await this.rpc.setLockdownState(LockdownState.LOCKDOWN_STATE_NORMAL);
        this.lockdownState.set(LockdownState.LOCKDOWN_STATE_NORMAL);
        break;
    }
  }
}
