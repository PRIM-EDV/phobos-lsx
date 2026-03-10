import { UseGuards } from "@nestjs/common";
import { GetAnnouncementFiles_Response, PlayAnnouncement_Request } from "@phobos-lsx/protocol";

import { AppGateway } from "src/app.gateway";
import { Roles } from "src/common/decorators/roles.decorator";
import { RolesGuard } from "src/common/guards/roles.guards";
import { Ws } from "src/common/interfaces/ws";
import { AnnouncementsService } from "./announcements.service";
import { RpcHandler, Rpc } from "lib/rpc/decorators";

@RpcHandler(AppGateway)
@UseGuards(RolesGuard)
export class AnnouncementsController { 

    constructor(private readonly service: AnnouncementsService) {};

    @Rpc()
    @Roles(['admin', 'tec'])
    public async getAnnouncementFiles(): Promise<GetAnnouncementFiles_Response> {
        const files = await this.service.getAnnouncementFiles();
        return {files: files};
    }

    @Rpc()
    @Roles(['admin', 'tec'])
    public async playAnnouncement(client: Ws, req: PlayAnnouncement_Request) {
        this.service.playAnnouncement(req.filepath).then().catch(console.error);
    }
}