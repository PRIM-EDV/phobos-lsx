import { Module } from '@nestjs/common';
import { DroneController } from './drone.controller';
import { DroneService } from './drone.service';
import { QlcModule } from 'src/app/platform/qlc/qlc.module';
import { SoundModule } from 'src/app/core/sound/sound.module';

@Module({
  imports: [
    QlcModule,
    SoundModule
  ],
  exports: [
    DroneService
  ],
  providers: [DroneController, DroneService]
})
export class DroneModule {}
