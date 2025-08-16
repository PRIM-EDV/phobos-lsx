import { Injectable } from "@angular/core";
import { LockdownState, Request, Response } from "@phobos-lsx/protocol";
import { LsxGateway } from "../../../infrastructure/lsx.gateway";

@Injectable({
  providedIn: 'root'
})
export class BaseLockdownRpcAdapter {

  constructor(private readonly gateway: LsxGateway) { }

  /**
   * Get the current auto lockdown state.
   * @returns The current auto lockdown state.
   */
  public async getAutoLockdown(): Promise<boolean> {
    const request: Request = {
      getAutoLockdown: {}
    }
    const response = await this.gateway.request(request);

    return response.getAutoLockdown!.state!;
  }

  /**
   * Get the current lockdown announcements state.
   * @returns The current lockdown announcements state.
   */
  public async getLockdownAnnouncements(): Promise<boolean> {
    const request: Request = {
      getLockdownAnnouncements: {}
    }
    const response = await this.gateway.request(request);

    return response.getLockdownAnnouncements!.state;
  }

  /**
   * Get the current base lockdown state.
   * @returns The current base lockdown state.
   */
  public async getLockdownState(): Promise<LockdownState> {
    const request: Request = {
      getLockdownState: {}
    }
    const response = await this.gateway.request(request);

    return response.getLockdownState!.state;
  }

  /**
   * Set the auto lockdown state.
   * @param state The auto lockdown state.
   */
  public async setAutoLockdown(state: boolean): Promise<void> {
    const request: Request = {
      setAutoLockdown: { state: state }
    }
    const response = await this.gateway.request(request);
  } 

  /**
   * Set the lockdown announcements state.
   * @param state The lockdown announcements state.
   */
  public async setLockdownAnnouncements(state: boolean): Promise<void> {
    const request: Request = {
      setLockdownAnnouncements: { state: state }
    }
    const response = await this.gateway.request(request);
  }

  /**
   * Set the current base lockdown state.
   * @param state The new base lockdown state.
   */
  public async setLockdownState(state: LockdownState): Promise<void> {
    const request: Request = {
      setLockdownState: { state: state }
    }
    const response = await this.gateway.request(request);
  }
}
