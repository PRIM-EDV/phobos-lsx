import { Module } from '@nestjs/common';
import { DroneController } from './drone.controller';
import { DroneService } from './drone.service';
import { QlcModule } from 'src/platform/qlc/qlc.module';
import { SoundModule } from 'src/core/sound/sound.module';

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
