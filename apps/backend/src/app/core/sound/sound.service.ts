import { Injectable } from "@nestjs/common";
import { AudioService } from "src/app/platform/audio/audio.service";
import { Track } from "src/app/platform/audio/common/track";

@Injectable()
export class SoundService {
    public announcementTrack: Track;
    public environmentTrack: Track;

    constructor(private readonly audio: AudioService) {
        this.announcementTrack = audio.createTrack();
        this.environmentTrack = audio.createTrack();
    }
}