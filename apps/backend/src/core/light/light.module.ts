import { Global, Module } from '@nestjs/common';
import { LightService } from './light.service';
import { LightRpcModule } from 'src/infrastructure/rpc/light/light.rpc.module';

@Global()
@Module({
    imports: [
        LightRpcModule
    ],
    exports: [
        LightService
    ],
    providers: [
        LightService
    ]
})
export class LightModule {}
