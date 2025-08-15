import { UseGuards } from "@nestjs/common";
import { BombArea_Request, GetBombAreaState_Request, GetBombAreaState_Response, GetModeSilentState_Request, GetModeSilentState_Response, SetModeSilentState_Request } from "@phobos-lsx/protocol";

import { AppGateway } from "src/app/app.gateway";
import { RolesGuard } from "src/app/common/guards/roles.guards";
import { Roles } from "src/app/common/decorators/roles.decorator";
import { DroneService } from "./drone.service";
import { StateService } from "src/app/core/state/state.service";
import { Ws } from "src/app/common/interfaces/ws";
import { Rpc, RpcHandler } from "lib/rpc/decorators";

@RpcHandler(AppGateway)
@UseGuards(RolesGuard)
export class DroneController {
    constructor(
        private readonly service: DroneService, 
        private readonly gateway: AppGateway,
        private readonly state: StateService
    ) { }

    @Rpc()
    @Roles(['admin'])
    public bombArea(client: Ws, req: BombArea_Request) {
        this.service.handleBombArea(req.id).then().catch((err) => {console.log(err)})
        this.gateway.requestAllButOne(client.id, {bombArea: req});
    }

    @Rpc()
    @Roles(['admin'])
    public bombBase() {
        this.service.handleBombBase().then().catch((err) => {console.log(err)})
    }

    @Rpc()
    @Roles(['admin'])
    public getBombAreaState(client: Ws, req: GetBombAreaState_Request): GetBombAreaState_Response {
        return { state: this.state.bombAreaStates.get(req.id) };
    }

    @Rpc()
    @Roles(['admin'])
    public getModeSilentState(client: Ws, req: GetModeSilentState_Request): GetModeSilentState_Response {
        return {state: this.state.modeSilentState};
    }

    @Rpc()
    @Roles(['admin'])
    public async setModeSilentState(client: Ws, req: SetModeSilentState_Request) {
        if (req.state != this.state.modeSilentState) {
            this.service.handleModeSilentStateChange(req.state);
            this.state.modeSilentState = req.state;
        }
   
        this.gateway.requestAllButOne(client.id, {setModeSilentState: req}).then();
    }

}