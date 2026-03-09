import { Injectable } from "@angular/core";
import { LsxRequestHandler } from "../../../infrastructure/rpc/lsx-request-handler.base";
import { PowerDevice, SetDevicePowerState_Request, SetDevicePowerState_Response } from "@phobos-lsx/protocol";
import { PowerControlService } from "../power-control.service";

@Injectable({
  providedIn: 'root'
})
export class PowerControlApiService extends LsxRequestHandler {

    constructor(
        private readonly service: PowerControlService
    ) {
        super();
    }

    private async setDevicePowerState(request: SetDevicePowerState_Request): Promise<SetDevicePowerState_Response> {
        switch (request.device) {
            case PowerDevice.DEVICE_CIC_MAPTOOL:
                this.service.maptoolPowerState.set(request.state);
                break;
            case PowerDevice.DEVICE_ADM_BASETOOL:
                this.service.basetoolPowerState.set(request.state);
                break;
            case PowerDevice.DEVICE_CIC_COFFEE:
                this.service.cicCoffee.set(request.state);
                break;
            case PowerDevice.DEVICE_IRD_RAPIDCARE:
                this.service.sciRapidCare.set(request.state);
                break;
            case PowerDevice.DEVICE_MED_OP_ROOM:
                this.service.medOpRapidCare.set(request.state);
                break;
        }
        
        return { };
    }
}