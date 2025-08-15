import { Global, Module } from '@nestjs/common';
import { QlcWebsocketService } from './qlc-websocket.service';
import { QlcService } from './qlc.service';

@Global()
@Module({
    exports: [
        QlcService,
        QlcWebsocketService
    ],
    providers: [
        QlcService,
        QlcWebsocketService
    ]
})
export class QlcModule {}
