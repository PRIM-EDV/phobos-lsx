import { Global, Module } from "@nestjs/common";
import { SoundService } from "./sound.service";

@Global()
@Module({
    providers: [
        SoundService
    ],
    exports: [
        SoundService
    ]
})
export class SoundModule {}