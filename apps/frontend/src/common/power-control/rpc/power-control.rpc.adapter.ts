import { Injectable } from "@angular/core";
import { PowerDevice, PowerState, Request } from "@phobos-lsx/protocol";

import { LsxGateway } from "../../../infrastructure/lsx.gateway";

@Injectable({
  providedIn: 'root'
})
export class PowerControlRpcAdapter {

  constructor(private readonly gateway: LsxGateway) {
  }

  /**
   * Retrieves the power state of a specified device.
   * @param device - The device for which the power state is to be retrieved.
   * @returns - Power state of the device.
   */
  public async getDevicePowerState(device: PowerDevice): Promise<PowerState> {
    const request: Request = {
      getDevicePowerState: {
        device: device
      }
    };
    const response = await this.gateway.request(request);

    return response.getDevicePowerState!.state;
  }

  /**
   * Set the power state of a power-device.
   * @param device - The device for which the power state is to be set.
   * @param state - The desired power state.
   */
  public async setDevicePowerState(device: PowerDevice, state: PowerState): Promise<void> {
    const request: Request = {
      setDevicePowerState: {
        device: device,
        state: state
      }
    };
    const response = await this.gateway.request(request);
  }
}