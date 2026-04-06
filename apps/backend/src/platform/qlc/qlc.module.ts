import { Global, Module } from '@nestjs/common';

import { WinstonLoggerModule } from '@phobos/infrastructure';

import { QlcWebsocketService } from './qlc-websocket.service';
import { QlcService } from './qlc.service';

@Global()
@Module({
    imports: [
        WinstonLoggerModule
    ],
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
