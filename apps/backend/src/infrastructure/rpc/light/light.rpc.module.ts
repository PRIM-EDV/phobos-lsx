import { Module } from '@nestjs/common';
import { LightRpcAdapter } from './light.rpc.adapter';


@Module({
    providers: [{
        provide: 'LightRpcAdapter',
        useClass: LightRpcAdapter
    }],
    exports: [{
        provide: 'LightRpcAdapter',
        useClass: LightRpcAdapter
    }]
})
export class LightRpcModule {}