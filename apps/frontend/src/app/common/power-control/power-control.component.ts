import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PowerDevice, PowerState, Request } from '@phobos-lsx/protocol';
import { PhButton, PhButtonSelect, PhForm } from '@phobos/elements';
import { PowerControlService } from './power-control.service';
import { PowerControlRpcAdapter } from './rpc/power-control.rpc.adapter';
import { PowerControlApiService } from './api/power-control.api.service';

@Component({
  selector: 'power-control',
  imports: [
    CommonModule,
    PhButton,
    PhButtonSelect,
    PhForm,
  ],
  templateUrl: './power-control.component.html',
  styleUrl: './power-control.component.scss'
})
export class PowerControlComponent {
  public powerDevice = PowerDevice;
  public powerState = PowerState;

  constructor(
    public readonly rpc: PowerControlRpcAdapter,
    public readonly service: PowerControlService,
    private readonly api: PowerControlApiService
  ) { }

  public async updatePowerState(device: PowerDevice, state: PowerState) {
    await this.rpc.setDevicePowerState(device, state);

    switch (device) {
      case PowerDevice.DEVICE_CIC_MAPTOOL:
        this.service.maptoolPowerState.set(state);
        break;
      case PowerDevice.DEVICE_ADM_BASETOOL:
        this.service.basetoolPowerState.set(state);
        break;
      case PowerDevice.DEVICE_CIC_COFFEE:
        this.service.cicCoffee.set(state);
        break;
      case PowerDevice.DEVICE_IRD_RAPIDCARE:
        this.service.sciRapidCare.set(state);
        break;
      case PowerDevice.DEVICE_MED_OP_ROOM:
        this.service.medOpRapidCare.set(state);
        break;
    }
  }
}

