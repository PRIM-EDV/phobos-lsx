import { effect, Inject, Injectable, Optional, signal, WritableSignal } from "@angular/core";
import { PowerDevice, PowerState } from "@phobos-lsx/protocol";
import { LsxGateway } from "../../infrastructure/lsx.gateway";
import { PowerControlRpcAdapter } from "./rpc/power-control.rpc.adapter";
import { AUTHZ_SERVICE_TOKEN, IAuthzService } from "@phobos/core";

@Injectable({
  providedIn: 'root'
})
export class PowerControlService {

  public maptoolPowerState: WritableSignal<PowerState> = signal(PowerState.POWER_STATE_POWERED);
  public basetoolPowerState: WritableSignal<PowerState> = signal(PowerState.POWER_STATE_POWERED);
  public cicCoffee: WritableSignal<PowerState> = signal(PowerState.POWER_STATE_POWERED);
  public sciRapidCare: WritableSignal<PowerState> = signal(PowerState.POWER_STATE_POWERED);
  public medOpRapidCare: WritableSignal<PowerState> = signal(PowerState.POWER_STATE_POWERED);

  powerStateInit = effect(async () => {
    if (this.gateway.isConnected()) {
      this.maptoolPowerState.set(await this.rpc.getDevicePowerState(PowerDevice.DEVICE_CIC_MAPTOOL));
      this.basetoolPowerState.set(await this.rpc.getDevicePowerState(PowerDevice.DEVICE_ADM_BASETOOL));
      this.cicCoffee.set(await this.rpc.getDevicePowerState(PowerDevice.DEVICE_CIC_COFFEE));
      this.sciRapidCare.set(await this.rpc.getDevicePowerState(PowerDevice.DEVICE_IRD_RAPIDCARE));
      this.medOpRapidCare.set(await this.rpc.getDevicePowerState(PowerDevice.DEVICE_MED_OP_ROOM));
    }
  });

  constructor(
    @Optional() @Inject(AUTHZ_SERVICE_TOKEN) public authz: IAuthzService,
    private readonly gateway: LsxGateway, 
    private readonly rpc: PowerControlRpcAdapter
  ){ }
}
