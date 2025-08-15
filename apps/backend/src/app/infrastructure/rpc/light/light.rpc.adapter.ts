import { Injectable } from '@nestjs/common';
import { LightId, LightDMXState, Request } from '@phobos-lsx/protocol';

import { AppGateway } from 'src/app/app.gateway';
import { ILightRpcAdapter } from 'src/app/core/common/interfaces/light.rpc.adapter.interface';

@Injectable()
export class LightRpcAdapter implements ILightRpcAdapter {
    constructor(private readonly gateway: AppGateway) {}
    
    async setDmxState(id: LightId, state: LightDMXState): Promise<void> {
        const req: Request = { setLightDmxState: { id, state } };
        this.gateway.requestAll(req);
    }
}