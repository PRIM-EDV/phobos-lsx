import { Component, OnInit } from '@angular/core';
import { PhButton, PhTable } from '@phobos/elements';
import { CommonModule } from '@angular/common';
import { SpeakerAnnouncementsRpcAdapter } from './rpc/speaker-annoucements.rpc.adapter';
import { SpeakerAnnouncementsService } from './speaker.announcements.service';

@Component({
    selector: 'speaker-announcements',
    imports: [
      CommonModule,
      PhButton,
      PhTable
    ],
    templateUrl: './speaker-announcements.component.html',
    styleUrls: ['./speaker-announcements.component.scss'],
    standalone: true
})
export class SpeakerAnnouncementsComponent {

  constructor(
    public readonly rpc: SpeakerAnnouncementsRpcAdapter,
    public readonly service: SpeakerAnnouncementsService
  ) {}
}
