import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend/backend.service';
import { Request } from 'proto/lsx';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'speaker-announcements',
    templateUrl: './speaker-announcements.component.html',
    styleUrls: ['./speaker-announcements.component.scss'],
    standalone: false
})
export class SpeakerAnnouncementsComponent implements OnInit {

  public announcementFiles: string[] = [];

  public tecFiles: string[] = [
    "TEC_01-11.wav",
    "TEC_01-21.wav",
    "TEC_0131.wav",
    "TEC_02-11.wav",
    "blackout.wav",
    "blackout_over.wav",
  ];

  constructor(private readonly backend: BackendService, private readonly auth: AuthService) {
    this.backend.onOpen.subscribe(async () => {
      this.backend.getAnnouncementFiles().then((files) => {
        if (auth.role == "admin") {
          this.announcementFiles = files;
        } else if (auth.role == "tec") {
          this.announcementFiles = this.tecFiles;
        }
      });
    });
   }

  ngOnInit(): void {
    if (this.backend.isConnected) {
      this.backend.getAnnouncementFiles().then((files) => {
        if (this.auth.role == "admin") {
          this.announcementFiles = files;
        } else if (this.auth.role == "tec") {
          this.announcementFiles = this.tecFiles;
        }
      });
    }
  }

  public playAnnoucement(file: string) {
    const req: Request = {
        playAnnouncement: {filepath: `assets/wav/triggered/${file}`}
    }

    this.backend.request(req);
  }

}
