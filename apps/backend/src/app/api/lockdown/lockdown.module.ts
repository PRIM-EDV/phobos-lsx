import { Module } from '@nestjs/common';
import { LockdownService } from './lockdown.service';
import { DroneModule } from 'src/app/api/drone/drone.module';
import { QlcModule } from 'src/app/platform/qlc/qlc.module';
import { LockdownController } from './lockdown.controller';

@Module({
  imports: [
    QlcModule,
    DroneModule
  ],
  exports: [
    LockdownService
  ],
  providers: [
    LockdownController,
    LockdownService]
})
export class LockdownModule {}
