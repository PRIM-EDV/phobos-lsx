import { Component, computed, Signal } from '@angular/core';
import { PowerPlantState } from '@phobos-lsx/protocol';
import { PhButton, PhButtonSelect, PhCommandList, PhForm } from '@phobos/elements';
import { PowerPlantService } from './power-plant.service';
import { PowerPlantApiService } from './api/power-plant.api.service';

@Component({
    selector: 'app-power-plant',
    imports: [
      PhCommandList,
      PhButton,
      PhButtonSelect,
      PhForm
    ],
    templateUrl: './power-plant.component.html',
    styleUrls: ['./power-plant.component.scss'],
    standalone: true
})
export class PowerPlantComponent {

  public powerPlantState: Signal<string> = computed(() => {
    switch (this.service.powerPlantState()) {
      case PowerPlantState.STATE_NORMAL: return 'normal';
      case PowerPlantState.STATE_OFFLINE: return 'offline';
      case PowerPlantState.STATE_CRITICAL: return 'critical';
      case PowerPlantState.STATE_POWER_SAVING: return 'low';
      default: return 'unknown';
    }
  })

  constructor(
    public readonly service: PowerPlantService,
    public readonly api: PowerPlantApiService
  ) { }
}
