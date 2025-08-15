import { Module } from '@nestjs/common';
import { PowerApiController } from './power.api.controller';

@Module({
  imports: [
  ],
  controllers: [PowerApiController],
})
export class PowerApiModule {}