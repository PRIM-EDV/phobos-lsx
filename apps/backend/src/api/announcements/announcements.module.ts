import { Module } from '@nestjs/common';
import { AnnouncementsService } from './announcements.service';
import { AnnouncementsController } from './annoucements.controller';
import { SoundModule } from 'src/core/sound/sound.module';

@Module({
  imports: [
    SoundModule
  ],
  providers: [
    AnnouncementsController,
    AnnouncementsService
  ]
})
export class AnnouncementsModule {}
