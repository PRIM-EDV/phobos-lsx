import { Controller, UnauthorizedException, UseGuards } from "@nestjs/common";
import { GetLightPowerState_Request, GetLightPowerState_Response, SetLightPowerState_Request, LockState, GetDevicePowerState_Request, GetDevicePowerState_Response, SetDevicePowerState_Request, PowerDevice, LightId, PowerState, GetPowerPlantState, GetPowerPlantState_Request, GetPowerPlantState_Response, SetPowerPlantState_Request } from "@phobos-lsx/protocol";

import { AppGateway } from "src/app/app.gateway";
import { Roles } from "src/app/common/decorators/roles.decorator";
import { RolesGuard } from "src/app/common/guards/roles.guards";
import { Ws } from "src/app/common/interfaces/ws";
import { LightService } from "src/app/core/light/light.service";
import { DeviceService } from "src/app/core/device/device.service";
import { Lightline } from "src/app/core/light/lightline/lightline";
import { RpcHandler, Rpc } from "lib/rpc/decorators";

import * as jose from 'jose';
import { StateService } from "src/app/core/state/state.service";
import { PowerService } from "./power.service";

@Controller('api/power')
@RpcHandler(AppGateway)
@UseGuards(RolesGuard)
export class PowerApiController {
  constructor(
    private readonly gateway: AppGateway,
    private readonly light: LightService,
    private readonly device: DeviceService,
    private readonly service: PowerService,
    private readonly state: StateService
  ) {

  }

  @Rpc()
  @Roles(['admin', 'tec'])
  public async getLightPowerState(client: Ws, req: GetLightPowerState_Request): Promise<GetLightPowerState_Response> {
    const powerState = await this.light.getLightPowerState(req.id);
    return {
      state: powerState
    }
  }

  @Rpc()
  @Roles(['admin', 'tec'])
  public async getPowerPlantState(client: Ws, req: GetPowerPlantState_Request): Promise<GetPowerPlantState_Response> {
    const powerState = this.state.powerPlantState

    return {
      state: powerState
    }
  }

  @Rpc()
  @Roles(['admin', 'tec'])
  public async setLightPowerState(client: Ws, req: SetLightPowerState_Request) {
    const payload = jose.decodeJwt(client.token);
    const lock = this.light.getLightLockState(req.id);

    if (payload.scope === 'tec' && lock == LockState.LOCK_STATE_LOCKED) {
      throw new UnauthorizedException();
    }

    this.light.setPowerState(req.id, req.state);
    this.gateway.requestAllButOne(client.id, { setLightPowerState: req }).then();
  }

  @Rpc()
  public async getDevicePowerState(client: Ws, req: GetDevicePowerState_Request): Promise<GetDevicePowerState_Response> {

    const powerState = this.device.getPowerState(req.device);
    console.log(powerState);
    return {
      state: powerState
    }
  }

  @Rpc()
  @Roles(['admin', 'tec'])
  public async setDevicePowerState(client: Ws, req: SetDevicePowerState_Request) {
    if (req.device === PowerDevice.DEVICE_CIC_COFFEE) {
      const lightLine = this.light.lightlines.get(LightId.LIGHT_OG_BASE_CIC);

      if (req.state == PowerState.POWER_STATE_UNPOWERED) {
        Lightline.dmx.setCue(lightLine.flickerCue, 'STOP');
        Lightline.dmx.setCue(lightLine.staticCue, 'STEP', 1);
      } else {
        lightLine.update().then().catch(console.error);
      }
    } else if (req.device === PowerDevice.DEVICE_IRD_RAPIDCARE) {
      const lightLine = this.light.lightlines.get(LightId.LIGHT_OG_BASE_SCI);

      if (req.state == PowerState.POWER_STATE_UNPOWERED) {
        Lightline.dmx.setCue(lightLine.flickerCue, 'STOP');
        Lightline.dmx.setCue(lightLine.staticCue, 'STEP', 1);
      } else {
        lightLine.update().then().catch(console.error);
      }
    } else if (req.device === PowerDevice.DEVICE_MED_OP_ROOM) {
      const lightLine = this.light.lightlines.get(LightId.LIGHT_OG_BASE_MED);

      if (req.state == PowerState.POWER_STATE_UNPOWERED) {
        Lightline.dmx.setCue(lightLine.flickerCue, 'STOP');
        Lightline.dmx.setCue(lightLine.staticCue, 'STEP', 1);
      } else {
        lightLine.update().then().catch(console.error);
      }

    }

    this.device.setPowerState(req.device, req.state);
    this.gateway.requestAllButOne(client.id, { setDevicePowerState: req }).then();
  }

  @Rpc()
  @Roles(['admin', 'tec'])
  public async setPowerPlantState(client: Ws, req: SetPowerPlantState_Request) {
    this.service.changePowerPlantState(req.state);
    this.gateway.requestAllButOne(client.id, { setPowerPlantState: req }).then();
  }
}