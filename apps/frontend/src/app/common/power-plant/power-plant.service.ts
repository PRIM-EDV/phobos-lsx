import { effect, Injectable, signal, WritableSignal } from '@angular/core';
import { PowerPlantState, Request } from '@phobos-lsx/protocol';

import { LsxGateway } from '../../infrastructure/lsx.gateway';
import { PowerPlantRpcAdapter } from './rpc/power-plant.rpc.adapter';

@Injectable({
  providedIn: 'root'
})
export class PowerPlantService {

  public powerPlantState: WritableSignal<PowerPlantState> = signal(PowerPlantState.STATE_NORMAL);

  powerPlantStateInit = effect(async () => {
    if (this.gateway.isConnected()) {
      this.powerPlantState.set(await this.rpc.getPowerPlantState());
    }
  });

  constructor(
    private readonly gateway: LsxGateway,
    private readonly rpc: PowerPlantRpcAdapter
  ) { }

  public async updatePowerPlantState(state: string) {
    switch (state) {
      case 'normal': 
        await this.rpc.setPowerPlantState(PowerPlantState.STATE_NORMAL);
        this.powerPlantState.set(PowerPlantState.STATE_NORMAL); break;
      case 'critical': 
        await this.rpc.setPowerPlantState(PowerPlantState.STATE_CRITICAL);
        this.powerPlantState.set(PowerPlantState.STATE_CRITICAL); break;
      case 'low': 
        await this.rpc.setPowerPlantState(PowerPlantState.STATE_POWER_SAVING);
        this.powerPlantState.set(PowerPlantState.STATE_POWER_SAVING); break;
      case 'offline': 
        await this.rpc.setPowerPlantState(PowerPlantState.STATE_OFFLINE);
        this.powerPlantState.set(PowerPlantState.STATE_OFFLINE); break;
    }
  }
}
