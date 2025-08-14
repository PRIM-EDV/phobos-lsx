import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BackendService } from '../infrastructure/backend.service';
import { PowerDevice, PowerState, Request } from '@phobos-lsx/protocol';
import { PhButton, PhButtonSelect, PhForm } from '@phobos/elements';

@Component({
  selector: 'lsx-device-control',
  imports: [
      CommonModule,
      PhButton,
      PhButtonSelect,
      PhForm,
  ],
  templateUrl: './device-control.component.html',
  styleUrl: './device-control.component.scss'
})
export class DeviceControlComponent {
  public powerDevice = PowerDevice;
  public powerState = PowerState;

  public maptoolPowerState = PowerState.POWER_STATE_POWERED;
  public basetoolPowerState = PowerState.POWER_STATE_POWERED;
  public cicCoffee = PowerState.POWER_STATE_POWERED;
  public sciRapidCare = PowerState.POWER_STATE_POWERED;
  public medOpRapidCare = PowerState.POWER_STATE_POWERED


  constructor(private backend: BackendService) {
    
  }

  public async onMaptoolPowerStateChange(state: PowerState) {
    const req: Request = {
      setDevicePowerState: {
        device: PowerDevice.DEVICE_CIC_MAPTOOL,
        state: state
      }
    }
    
    await this.backend.request(req);
  }

  public async onBasetoolPowerStateChange(state: PowerState) {
    const req: Request = {
      setDevicePowerState: {
        device: PowerDevice.DEVICE_ADM_BASETOOL,
        state: state
      }
    }
  }

  public async onLightDevicePowerStateChange(device: PowerDevice, state: PowerState) {
    const req: Request = {
      setDevicePowerState: {
        device: device,
        state: state
      }
    }
    await this.backend.request(req);
  }


}
