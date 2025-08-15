import { Injectable } from "@angular/core";
import { LsxGateway } from "../../../infrastructure/lsx.gateway";
import { LightId, LightDMXState, GetLightDmxState_Response, Request, GetLightLockState_Response, GetLightMode_Response, GetLightPowerState_Response, GetLightSwitchState_Response, LightMode, LightSwitchState, LockState, PowerState } from "@phobos-lsx/protocol";

@Injectable({
  providedIn: 'root'
})
export class LightControlRpcAdapter {

  constructor(
    private readonly gateway: LsxGateway
  ) { }

  /**
   * Gets the DMX state of a light by its ID.
   * @param id 
   * @returns 
   */
  public async getLightDMXState(id: LightId): Promise<LightDMXState> {
    const requqest: Request = {
      getLightDmxState: {
        id: id
      }
    }
    const response = (await this.gateway.request(requqest)).getLightDmxState as GetLightDmxState_Response;

    return response.state;
  }

  public async getLightLockState(id: LightId): Promise<LockState> {
    const request: Request = {
      getLightLockState: {
        id: id
      }
    }
    const res = (await this.gateway.request(request)).getLightLockState as GetLightLockState_Response;

    return res.state;
  }

  /**
   * Gets the mode of a light by its ID.
   * @param id 
   * @returns 
   */
  public async getLightMode(id: LightId): Promise<LightMode> {
    const req: Request = {
      getLightMode: {
        id: id
      }
    }

    const res = (await this.gateway.request(req)).getLightMode as GetLightMode_Response;

    return res.mode;
  }

  /**
   * Gets the power state of a light by its ID.
   * @param id 
   * @returns 
   */
  public async getLightPowerState(id: LightId): Promise<PowerState> {
    const request: Request = {
      getLightPowerState: {
        id: id
      }
    }
    const res = (await this.gateway.request(request)).getLightPowerState as GetLightPowerState_Response;

    return res.state;
  }

  /**
   * Gets the switch state of a light by its ID.
   * @param id 
   * @returns 
   */
  public async getLightSwitchState(id: LightId): Promise<LightSwitchState> {
    const request: Request = {
      getLightSwitchState: {
        id: id
      }
    }
    const res = (await this.gateway.request(request)).getLightSwitchState as GetLightSwitchState_Response;

    return res.state;
  }

  /**
   * Sets the DMX state of a light by its ID.
   * @param id 
   * @param state 
   */
  public async setLightDMXState(id: LightId, state: LightDMXState) {
    const request: Request = {
      setLightDmxState: {
        id: id,
        state: state
      }
    }
    await this.gateway.request(request);
  }

  /**
   * Sets the lock state of a light by its ID.
   * @param id
   * @param state
   */
  public async setLightLockState(id: LightId, state: LockState) {
    const request: Request = {
      setLightLockState: {
        id: id,
        state: state
      }
    }
    await this.gateway.request(request);
  }

  /**
   * Sets the power state of a light by its ID.
   * @param id
   * @param state
   */
  public async setLightPowerState(id: LightId, state: PowerState) {
    const request: Request = {
      setLightPowerState: {
        id: id,
        state: state
      }
    }
    await this.gateway.request(request);
  }

  /**
   * Sets the switch state of a light by its ID.
   * @param id
   * @param state
   */
  public async setLightSwitchState(id: LightId, state: LightSwitchState) {
    const request: Request = {
      setLightSwitchState: {
        id: id,
        state: state
      }
    }
    await this.gateway.request(request);
  }
}