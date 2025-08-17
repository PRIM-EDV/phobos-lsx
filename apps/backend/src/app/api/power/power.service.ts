import { Injectable } from "@nestjs/common";
import { PowerPlantState, PowerState } from "@phobos-lsx/protocol";
import { StateService } from "../../core/state/state.service";
import { SoundService } from "src/app/core/sound/sound.service";
import { LightService } from "src/app/core/light/light.service";

@Injectable()
export class PowerService {

  constructor(
    private readonly light: LightService,
    private readonly sound: SoundService,
    private readonly state: StateService
  ) {

  }

  public changePowerPlantState(state: PowerPlantState) {
    if (state === this.state.powerPlantState) return;

    switch (state) {
      case PowerPlantState.STATE_OFFLINE:
        this.light.lightlines.forEach(lightline => {
          lightline.setPowerState(PowerState.POWER_STATE_UNPOWERED);
        });
        this.sound.announcementTrack.play('assets/wav/triggered/blackout.wav').then().catch(console.error);
        break;
      case PowerPlantState.STATE_NORMAL:
        switch(this.state.powerPlantState) {
          case PowerPlantState.STATE_OFFLINE:
            this.light.lightlines.forEach(lightline => {
              lightline.setPowerState(PowerState.POWER_STATE_POWERED);
            });
            this.sound.announcementTrack.play('assets/wav/triggered/blackout_over.wav').then().catch(console.error);
            break;
        } break;
      }

    this.state.powerPlantState = state;
  }
}