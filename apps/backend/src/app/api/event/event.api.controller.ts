import { UseGuards } from "@nestjs/common";
import { Rpc, RpcHandler } from "lib/rpc/decorators";
import { AppGateway } from "src/app/app.gateway";
import { RolesGuard } from "src/app/common/guards/roles.guards";
import { StateService } from "src/app/core/state/state.service";
import { Roles } from "src/app/common/decorators/roles.decorator";
import { EventApiService } from "./event.api.service";

@RpcHandler(AppGateway)
@UseGuards(RolesGuard)
export class EventApiController {
    constructor(
        private readonly service: EventApiService, 
        private readonly gateway: AppGateway,
        private readonly state: StateService
    ) { }

    @Rpc()
    @Roles(['admin'])
    public async fireEmp() {
        this.service.handleFireEmp().then().catch((err) => {console.log(err)})
    }
}