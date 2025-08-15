import { Injectable } from "@angular/core";
import { LsxRequestHandler } from "../../../infrastructure/rpc/lsx-request-handler.base";
import { LightControlService } from "../light-control.service";
import { SetLightDmxState_Request, SetLightLockState_Request, SetLightPowerState_Request, SetLightSwitchState_Request } from "@phobos-lsx/protocol";

@Injectable({
  providedIn: 'root'
})
export class LightControlApiService extends LsxRequestHandler {
    constructor(
        private readonly service: LightControlService
    ) {
        super();
    }

    private setLightSwitchState(request: SetLightSwitchState_Request) {
        const light = this.service.lights().find(l => l.id === request.id);

        if (light) {
            light.switchState = request.state;
            this.service.lights.set([...this.service.lights()]);
        }
    }

    private setLightLockState(request: SetLightLockState_Request) {
        const light = this.service.lights().find(l => l.id === request.id);

        if (light) {
            light.lockState = request.state;
            this.service.lights.set([...this.service.lights()]);
        }
    }

    private setLightPowerState(request: SetLightPowerState_Request) {
        const light = this.service.lights().find(l => l.id === request.id);

        if (light) {
            light.powerState = request.state;
            this.service.lights.set([...this.service.lights()]);
        }
    }

    private setLightDmxState(request: SetLightDmxState_Request) {
        const light = this.service.lights().find(l => l.id === request.id);

        if (light) {
            light.dmxState = request.state;
            this.service.lights.set([...this.service.lights()]);
        }
    }
}
