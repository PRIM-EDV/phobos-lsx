import { Component } from '@angular/core';
import { PhButton, PhButtonSelect, PhForm } from '@phobos/elements';
import { LockdownState } from '@phobos-lsx/protocol';
import { BaseLockdownService } from './base-lockdown.service';
import { BaseLockdownApiService } from './api/base-lockdown.api.service';

@Component({
    selector: 'base-lockdown',
    imports: [
      PhButton,
      PhButtonSelect,
      PhForm,
    ],
    templateUrl: './base-lockdown.component.html',
    styleUrls: ['./base-lockdown.component.scss'],
    standalone: true
})
export class BaseLockdownComponent {

  public LockdownState = LockdownState;

  constructor(
    public readonly service: BaseLockdownService,
    private readonly api: BaseLockdownApiService
  ) { }
}
