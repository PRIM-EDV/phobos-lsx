import { Module } from '@nestjs/common';
import { PowerApiController } from './power.api.controller';
import { PowerService } from './power.service';

@Module({
  imports: [
  ],
  controllers: [
    PowerApiController
  ],
  providers: [
    PowerService
  ]
})
export class PowerApiModule {}