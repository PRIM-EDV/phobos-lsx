import { Module } from '@nestjs/common';
import { QlcModule } from 'src/app/platform/qlc/qlc.module';
import { SoundModule } from 'src/app/core/sound/sound.module';
import { EventApiController } from './event.api.controller';
import { EventApiService } from './event.api.service';

@Module({
  imports: [
    QlcModule,
    SoundModule
  ],
  exports: [
    EventApiService
  ],
  providers: [EventApiController, EventApiService]
})
export class EventApiModule {}
