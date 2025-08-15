import * as fs from 'fs';

import { Injectable, UseGuards } from '@nestjs/common';
import { SoundService } from 'src/app/core/sound/sound.service';

@Injectable()
export class AnnouncementsService {

    constructor(private readonly sound: SoundService) {}

    public async getAnnouncementFiles(): Promise<string[]> {
        return new Promise<string[]>((resolve, reject) => {
            fs.readdir('assets/wav/triggered', (err, files) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(files);
                }
            })
        })
    }

    public async playAnnouncement(filepath: string): Promise<void> {
        this.sound.announcementTrack.play(filepath).then().catch((err) => {console.log(err)});
    }
}
