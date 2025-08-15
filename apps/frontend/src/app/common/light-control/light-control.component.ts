import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LightControlService } from './light-control.service';
import { LightId, LightDMXState, LightSwitchState, PowerState, LockState, GetLightDmxState_Response, GetLightPowerState_Response, GetLightSwitchState_Response, GetLightLockState_Response, LightMode, GetLightMode_Response, Request, Response } from '@phobos-lsx/protocol';
import { PhButton, PhButtonSelect, PhForm, PhGroup } from '@phobos/elements';
import { LightControlRpcAdapter } from './rpc/light-control.rpc.adapter';
import { LightControlApiService } from './api/light-control.api.service';

@Component({
  selector: 'light-control',
  imports: [
    CommonModule,
    PhForm,
    PhGroup,
    PhButton,
    PhButtonSelect
  ],
  templateUrl: './light-control.component.html',
  styleUrl: './light-control.component.scss'
})
export class LightControlComponent {
  public lightSwitchState = LightSwitchState;
  public lightLockState = LockState;
  public lightPowerState = PowerState;
  public lightDMXState = LightDMXState;

  constructor(
    public readonly rpc: LightControlRpcAdapter,
    public readonly service: LightControlService,
    private readonly api: LightControlApiService
  ) {
   
  }

  public async updateLightSwitchState(id: LightId, state: LightSwitchState) {
    const light = this.service.lights().find(l => l.id === id);

    if (light) {
      await this.rpc.setLightSwitchState(id, state);

      light.switchState = state;
      this.service.lights.set([...this.service.lights()]);
    }
  }

  public async updateLightLockState(id: LightId, state: LockState) {
    const light = this.service.lights().find(l => l.id === id);

    if (light) {
      await this.rpc.setLightLockState(id, state);

      light.lockState = state;
      this.service.lights.set([...this.service.lights()]);
    }
  }

  public async updateLightPowerState(id: LightId, state: PowerState) {
    const light = this.service.lights().find(l => l.id === id);

    if (light) {
      await this.rpc.setLightPowerState(id, state);

      light.powerState = state;
      this.service.lights.set([...this.service.lights()]);
    }
  }

  public async updateLightDMXState(id: LightId, state: LightDMXState) {
    const light = this.service.lights().find(l => l.id === id);

    if (light) {
      await this.rpc.setLightDMXState(id, state);

      light.dmxState = state;
      this.service.lights.set([...this.service.lights()]);
    }
  }
}
