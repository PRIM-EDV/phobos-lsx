import { effect, Injectable, signal, WritableSignal } from "@angular/core";
import { lightConfig } from "./config/light.config";
import { Light } from "./interfaces/light.interface";
import { LsxGateway } from "../../infrastructure/lsx.gateway";
import { LightControlRpcAdapter } from "./rpc/light-control.rpc.adapter";

@Injectable({
    providedIn: 'root'
})
export class LightControlService {
    public lights: WritableSignal<Light[]> = signal(lightConfig.lights);

    lightInit = effect(async () => {
        if (this.gateway.isConnected()) {
            this.lights().forEach(async (light) => {
                light.dmxState = await this.rpc.getLightDMXState(light.id);
                light.switchState = await this.rpc.getLightSwitchState(light.id);
                light.powerState = await this.rpc.getLightPowerState(light.id);
                light.lockState = await this.rpc.getLightLockState(light.id);
            });
        }
    });

    constructor(private readonly gateway: LsxGateway, private readonly rpc: LightControlRpcAdapter) {

    }
}