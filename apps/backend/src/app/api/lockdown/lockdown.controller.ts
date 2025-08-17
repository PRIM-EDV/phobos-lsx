import { UseGuards } from "@nestjs/common";
import { GetAutoLockdown_Response, SetAutoLockdown_Request, GetLockdownAnnouncements_Response, SetLockdownAnnouncements_Request, GetLockdownState_Response, SetLockdownState_Request } from "@phobos-lsx/protocol";

import { AppGateway } from "src/app/app.gateway";
import { RolesGuard } from "src/app/common/guards/roles.guards";
import { LockdownService } from "./lockdown.service";
import { Ws } from "src/app/common/interfaces/ws";
import { Roles } from "src/app/common/decorators/roles.decorator";
import { RpcHandler, Rpc } from "lib/rpc/decorators";
import { StateService } from "src/app/core/state/state.service";

@RpcHandler(AppGateway)
@UseGuards(RolesGuard)
export class LockdownController {

    constructor(
        private readonly gateway: AppGateway,
        private readonly service: LockdownService,
        private readonly state: StateService
    ) { }

    @Rpc()
    @Roles(['admin'])
    public getAutoLockdown(): GetAutoLockdown_Response {
        return { state: this.service.autoLockdown };
    }

    @Rpc()
    @Roles(['admin'])
    public setAutoLockdown(client: Ws, req: SetAutoLockdown_Request) {
        this.service.setAutoLockdown(req.state);
        this.gateway.requestAllButOne(client.id, { setAutoLockdown: req }).then();
    }

    @Rpc()
    @Roles(['admin'])
    public getLockdownAnnouncements(): GetLockdownAnnouncements_Response {
        return { state: this.service.lockdownAnnouncements };
    }

    @Rpc()
    @Roles(['admin'])
    public setLockdownAnnouncements(client: Ws, req: SetLockdownAnnouncements_Request) {
        this.service.setLockdownAnnouncements(req.state);
        this.gateway.requestAllButOne(client.id, { setLockdownAnnouncements: req }).then();
    }

    @Rpc()
    @Roles(['admin'])
    public getLockdownState(): GetLockdownState_Response {
        return { state: this.state.lockdownState };
    }

    @Rpc()
    @Roles(['admin'])
    public setLockdownState(client: Ws, req: SetLockdownState_Request) {
        this.service.setLockdownState(req.state);
        this.gateway.requestAllButOne(client.id, { setLockdownState: req }).then();
    }
}