import { UseGuards } from "@nestjs/common";
import { RpcHandler } from "lib/rpc/decorators";
import { AppGateway } from "src/app/app.gateway";
import { RolesGuard } from "src/app/common/guards/roles.guards";

@RpcHandler(AppGateway)
@UseGuards(RolesGuard)
export class SoundApiController {
    
}
