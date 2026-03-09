import { Injectable } from "@angular/core";
import { LsxRequestHandler } from "../../../infrastructure/rpc/lsx-request-handler.base";
import { SetModeSilentState_Request, SetModeSilentState_Response } from "@phobos-lsx/protocol";
import { DroneControlService } from "../drone-control.service";

@Injectable({
  providedIn: 'root'
})
export class DroneControlApiService extends LsxRequestHandler {
    constructor(
        private readonly service: DroneControlService
    ) {
        super();
    }

    private async setModeSilentState(request: SetModeSilentState_Request): Promise<SetModeSilentState_Response> {
        this.service.modeSilentState.set(request.state);
        return {};
    }
}
