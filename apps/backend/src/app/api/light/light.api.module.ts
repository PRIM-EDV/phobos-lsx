import { Module } from '@nestjs/common';
import { LightModule } from 'src/app/core/light/light.module';
import { StateModule } from 'src/app/core/state/state.module';
import { QlcModule } from 'src/app/platform/qlc/qlc.module';
import { LightApiController } from './light.api.controller';

@Module({
  imports: [
    LightModule,
    StateModule,
    QlcModule
  ],
  providers: [LightApiController],
})
export class LightApiModule {}