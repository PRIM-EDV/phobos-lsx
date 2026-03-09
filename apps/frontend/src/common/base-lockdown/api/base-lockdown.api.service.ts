import { Injectable } from "@angular/core";
import { SetAutoLockdown_Request, SetLockdownAnnouncements_Request, SetLockdownState_Request } from "@phobos-lsx/protocol";

import { BaseLockdownService } from "../base-lockdown.service";
import { LsxRequestHandler } from "../../../infrastructure/rpc/lsx-request-handler.base";


@Injectable({
  providedIn: 'root'
})
export class BaseLockdownApiService extends LsxRequestHandler {

    constructor(
        private readonly service: BaseLockdownService
    ) {
        super();
    }

    private async setAutoLockdown(request: SetAutoLockdown_Request): Promise<void> {
        this.service.autoLockdown.set(request.state);
    }

    private async setLockdownAnnouncements(request: SetLockdownAnnouncements_Request): Promise<void> {
        this.service.lockdownAnnouncements.set(request.state);
    }

    private async setLockdownState(request: SetLockdownState_Request): Promise<void> {
        this.service.lockdownState.set(request.state);
    }
}
