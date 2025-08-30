import { Module } from '@nestjs/common';
import { QlcModule } from 'src/app/platform/qlc/qlc.module';
import { SoundModule } from 'src/app/core/sound/sound.module';
import { EventApiController } from './event.api.controller';
import { EventApiService } from './event.api.service';
import { PowerApiModule } from '../power/power.api.module';

@Module({
  imports: [
    QlcModule,
    SoundModule,
    PowerApiModule
  ],
  exports: [
    EventApiService
  ],
  providers: [EventApiController, EventApiService]
})
export class EventApiModule {}
