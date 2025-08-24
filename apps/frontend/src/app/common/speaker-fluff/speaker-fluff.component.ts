import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PhButton, PhButtonSelect, PhForm, PhTable } from '@phobos/elements';

import { SpeakerFluffService } from './speaker-fluff.service';
import { SpeakerFluffRpcAdapter } from './rpc/speaker-fluff.rpc.adapter';
import { SpeakerFluffApiService } from './api/speaker-fluff.api.service';

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
    public readonly service: SpeakerFluffService,
    private readonly api: SpeakerFluffApiService
  ) {

  };
}


