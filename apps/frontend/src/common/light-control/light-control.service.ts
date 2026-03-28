import { effect, Injectable, signal, untracked, WritableSignal } from "@angular/core";

import { LsxGateway } from "../../infrastructure/lsx.gateway";
import { lightConfig } from "./config/light.config";
import { Light } from "./interfaces/light.interface";
import { LightControlRpcAdapter } from "./rpc/light-control.rpc.adapter";

@Injectable({
  providedIn: 'root'
})
export class LightControlService {
  public lights: WritableSignal<Light[]> = signal(lightConfig.lights);

  lightInit = effect(async () => {
    if (this.gateway.isConnected()) {
      untracked(() => {
        this.lights().forEach(async (light) => {
          light.dmxState = await this.rpc.getLightDMXState(light.id).catch(error => this.handleGetStateError('DMX state', error)) ?? light.dmxState;
          light.switchState = await this.rpc.getLightSwitchState(light.id).catch(error => this.handleGetStateError('Switch state', error)) ?? light.switchState;
          light.powerState = await this.rpc.getLightPowerState(light.id).catch(error => this.handleGetStateError('Power state', error)) ?? light.powerState;
          light.lockState = await this.rpc.getLightLockState(light.id).catch(error => this.handleGetStateError('Lock state', error)) ?? light.lockState;
        });
      });
    }
  });

  constructor(
    private readonly gateway: LsxGateway,
    private readonly rpc: LightControlRpcAdapter
  ) { }

  private handleGetStateError(stateType: string, error: any) {
    switch (error.message) {
      case 'Forbidden resource':
        console.warn(`Could not fetch ${stateType}: Unauthorized.`);
        break;
      default:
        console.error(`Error fetching ${stateType}:`, error);
    }
  }
}