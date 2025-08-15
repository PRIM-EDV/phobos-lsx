import { Module } from '@nestjs/common';
import { LightApiModule } from './light/light.api.module';
import { PowerApiModule } from './power/power.api.module';

@Module({
  imports: [
    LightApiModule,
    PowerApiModule
  ],
  controllers: [],
  providers: [],
})
export class ApiModule {}