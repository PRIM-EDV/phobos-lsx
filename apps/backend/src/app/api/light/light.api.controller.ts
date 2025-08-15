import { UseGuards } from "@nestjs/common";
import { GetLightSwitchState_Request, GetLightSwitchState_Response, SetLightSwitchState_Request, LockState, GetLightLockState_Response, SetLightLockState_Request, GetLightDmxState_Request, GetLightDmxState_Response, SetLightDmxState_Request, SetLightPowerState_Request } from "@phobos-lsx/protocol";

import { AppGateway } from "src/app/app.gateway";
import { Roles } from "src/app/common/decorators/roles.decorator";
import { RolesGuard } from "src/app/common/guards/roles.guards";
import { Ws } from "src/app/common/interfaces/ws";
import { LightService } from "src/app/core/light/light.service";
import { RpcHandler, Rpc } from "lib/rpc/decorators";

import * as jose from 'jose'


@RpcHandler(AppGateway)
@UseGuards(RolesGuard)
export class LightApiController {
    constructor(
        private readonly gateway: AppGateway,
        private readonly light: LightService
    ) { }

    @Rpc()
    @Roles(['admin', 'tec'])
    public async getLightSwitchState(client: Ws, req: GetLightSwitchState_Request): Promise<GetLightSwitchState_Response> {
        const state = this.light.getLightSwitchState(req.id);

        return {
            state: state
        }
    }
    
    @Rpc()
    @Roles(['admin', 'tec'])
    public async setLightSwitchState(client: Ws, req: SetLightSwitchState_Request) {
        const payload = jose.decodeJwt(client.token);
        if (payload.scope !== 'admin' && this.light.getLightLockState(req.id) === LockState.LOCK_STATE_LOCKED) {
            const state = this.light.getLightSwitchState(req.id);

            throw new Error('Light is locked');
        } else {
            await this.light.setLightSwitchState(req.id, req.state);
            this.gateway.requestAllButOne(client.id, { setLightSwitchState: req }).then().catch(console.error);
        }
    }

    @Rpc()
    @Roles(['admin', 'tec'])
    public async getLightLockState(client: Ws, req: GetLightSwitchState_Request): Promise<GetLightLockState_Response> {
        const state = this.light.getLightLockState(req.id);

        return {
            state: state
        }
    }

    @Rpc()
    @Roles(['admin'])
    public async setLightLockState(client: Ws, req: SetLightLockState_Request) {
        this.light.setLightLockState(req.id, req.state);

    }

    @Rpc()
    @Roles(['admin'])
    public async getLightDmxState(client: Ws, req: GetLightDmxState_Request): Promise<GetLightDmxState_Response> {
        const state = this.light.getLightDmxState(req.id);

        return {
            state: state
        }
    }

    @Rpc()
    @Roles(['admin'])
    public async setLightDmxState(client: Ws, req: SetLightDmxState_Request) {
        this.light.setLightDMXState(req.id, req.state);


    }

    @Rpc()
    @Roles(['admin', 'tec'])
    public async setLightPowerState(client: Ws, req: SetLightPowerState_Request) {
        const payload = jose.decodeJwt(client.token);
        if (payload.scope !== 'admin' && this.light.getLightLockState(req.id) === LockState.LOCK_STATE_LOCKED) {
            const state = this.light.getLightPowerState(req.id);

            throw new Error('Light is locked');
        } else {
            await this.light.setPowerState(req.id, req.state);
            this.gateway.requestAllButOne(client.id, { setLightPowerState: req }).then().catch(console.error);
        }
    }

    
}