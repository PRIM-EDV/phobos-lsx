import { Module } from '@nestjs/common';
import { SoundApiController } from './sound.api.controller';

@Module({
    controllers: [],
    providers: [SoundApiController],
})
export class SoundApiModule {}