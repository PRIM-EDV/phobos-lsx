import { Component, computed, Signal } from '@angular/core';
import { PhButton, PhButtonSelect, PhCommandList, PhForm, PhTable } from '@phobos/elements';
import { CommonModule } from '@angular/common';
import { DroneControlService } from './drone-control.service';
import { DroneControlRpcAdapter } from './rpc/drone-control.rpc.adapter';
import { DroneControlApiService } from './api/drone-control.api.service';
import { ModeSilentState } from '@phobos-lsx/protocol';


@Component({
    selector: 'drone-control',
    imports: [
      CommonModule,
      PhButton,
      PhButtonSelect,
      PhCommandList,
      PhForm,
      PhTable
    ],
    templateUrl: './drone-control.component.html',
    styleUrls: ['./drone-control.component.scss'],
    standalone: true
})
export class DroneControlComponent {

  public modeSilentState: Signal<string> = computed(() => {
    switch (this.service.modeSilentState()) {
      case ModeSilentState.MODE_SILENT_STATE_NORMAL:
        return 'normal';
      case ModeSilentState.MODE_SILENT_STATE_SILENT:
        return 'silent';
      case ModeSilentState.MODE_SILENT_STATE_SILENT_DRONE:
        return 'silent drone';
      default:
        return 'unknown';
    }
  });

  constructor(
    public readonly rpc: DroneControlRpcAdapter,
    public readonly service: DroneControlService,
    private readonly api: DroneControlApiService
  ) {}
}

