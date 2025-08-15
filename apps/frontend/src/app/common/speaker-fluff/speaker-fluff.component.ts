import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../infrastructure/backend.service';
import { SpeakerFluffService } from './speaker-fluff.service';
import { Request } from '@phobos-lsx/protocol';
import { PhButton, PhButtonSelect, PhForm, PhTable } from '@phobos/elements';
import { SpeakerAnnouncementsRpcAdapter } from '../speaker-announcements/rpc/speaker-annoucements.rpc.adapter';
import { SpeakerFluffRpcAdapter } from './rpc/speaker-fluff.rpc.adapter';

@Component({
  selector: 'speaker-fluff',
  imports: [
    CommonModule,
    PhButton,
    PhButtonSelect,
    PhForm,
    PhTable
  ],
  templateUrl: './speaker-fluff.component.html',
  styleUrls: ['./speaker-fluff.component.scss'],
  standalone: true
})
export class SpeakerFluffComponent {

  constructor(
    public readonly rpc: SpeakerFluffRpcAdapter,
    public readonly service: SpeakerFluffService
  ) {

  };
}


