import { Module } from '@nestjs/common';
import { FluffService } from './fluff.service';
import { DroneModule } from 'src/api/drone/drone.module';
import { SoundModule } from 'src/core/sound/sound.module';
import { FluffController } from './fluff.controller';


@Module({
    imports: [
        SoundModule,
        DroneModule
    ],
    providers: [FluffController, FluffService]
})
export class FluffModule { }
