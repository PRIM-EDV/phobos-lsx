import { Injectable } from "@angular/core";
import { LsxRequestHandler } from "../../../infrastructure/rpc/lsx-request-handler.base";
import { SetFluffState_Request } from "@phobos-lsx/protocol";
import { SpeakerFluffService } from "../speaker-fluff.service";

@Injectable({
  providedIn: 'root'
})
export class SpeakerFluffApiService extends LsxRequestHandler {

    constructor(
        private readonly service: SpeakerFluffService
    ) {
        super();
    }

    private async setFluffState(request: SetFluffState_Request): Promise<void> {
        const state = request.state!;
        this.service.fluffState.set(state);
    }
}
