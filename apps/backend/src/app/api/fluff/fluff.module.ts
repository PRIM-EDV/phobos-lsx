import { Module } from '@nestjs/common';
import { FluffService } from './fluff.service';
import { DroneModule } from 'src/app/api/drone/drone.module';
import { FluffController } from './fluff.controller';
import { SoundModule } from 'src/app/core/sound/sound.module';

@Module({
    imports: [
        SoundModule,
        DroneModule
    ],
    providers: [FluffController, FluffService]
})
export class FluffModule { }
