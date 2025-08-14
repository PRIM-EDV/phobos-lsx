import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BackendService } from '../infrastructure/backend.service';
import { LightControlService } from './light-control.service';
import { LightId, LightDMXState, LightSwitchState, PowerState, LockState, GetLightDmxState_Response, GetLightPowerState_Response, GetLightSwitchState_Response, GetLightLockState_Response, LightMode, GetLightMode_Response, Request, Response } from '@phobos-lsx/protocol';
import { PhButton, PhButtonSelect, PhForm, PhGroup } from '@phobos/elements';


export interface Light {
  id: LightId;
  label: string;
  dmxState: LightDMXState;
  switchState: LightSwitchState;
  powerState: PowerState;
  lockState: LockState
}

@Component({
  selector: 'lsx-light-control',
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
    private readonly backend: BackendService,
    public readonly service: LightControlService
  ) {
    this.backend.onOpen.subscribe(() => {
      this.service.lights.forEach(async (light) => {
        light.dmxState = await this.getLightDMXState(light.id);
        light.switchState = await this.getLightSwitchState(light.id);
        light.powerState = await this.getLightPowerState(light.id);
        light.lockState = await this.getLightLockState(light.id);
      });
    });
  }

  public async onLightSwitchStateChange(id: LightId, state: LightSwitchState) {
    const req: Request = {
      setLightSwitchState: {
        id: id,
        state: state
      }
    }

    await this.backend.request(req);
  }

  public async onLightLockStateChange(id: LightId, state: LockState) {
    // const req: Request = {
    //   setLight: {
    //     id: id,
    //     state
    //   }
    // }

    // await this.backend.request(req);
  }

  public async onLightPowerStateChange(id: LightId, state: PowerState) {
    const req: Request = {
      setLightPowerState: {
        id: id,
        state: state
      }
    }

    await this.backend.request(req);
  }

  public async onLightDMXStateChange(id: LightId, state: LightDMXState) {
    const req: Request = {
      setLightDmxState: {
        id: id,
        state: state
      }
    }

    await this.backend.request(req);
  }

  private async getLightDMXState(id: LightId): Promise<LightDMXState> {
    const req: Request = {
      getLightDmxState: {
        id: id
      }
    }

    const res = (await this.backend.request(req)).getLightDmxState as GetLightDmxState_Response;

    return res.state;
  }

  private async getLightPowerState(id: LightId): Promise<PowerState> {
    const req: Request = {
      getLightPowerState: {
        id: id
      }
    }

    const res = (await this.backend.request(req)).getLightPowerState as GetLightPowerState_Response;

    return res.state;
  }

  private async getLightSwitchState(id: LightId): Promise<LightSwitchState> {
    const req: Request = {
      getLightSwitchState: {
        id: id
      }
    }

    const res = (await this.backend.request(req)).getLightSwitchState as GetLightSwitchState_Response;

    return res.state;
  }

  private async getLightLockState(id: LightId): Promise<LockState> {
    const req: Request = {
      getLightLockState: {
        id: id
      }
    }

    const res = (await this.backend.request(req)).getLightLockState as GetLightLockState_Response;

    return res.state;
  }

  public async getLightMode(id: LightId): Promise<LightMode> {
    const req: Request = {
      getLightMode: {
        id: id
      }
    }

    const res = (await this.backend.request(req)).getLightMode as GetLightMode_Response;

    return res.mode;
  }
}
