import { Injectable } from "@nestjs/common";
import { LightMode, PowerPlantState, PowerState } from "@phobos-lsx/protocol";

import { LightService } from "src/core/light/light.service";
import { SoundService } from "src/core/sound/sound.service";
import { StateService } from "src/core/state/state.service";
import { PowerService } from "../power/power.service";

@Injectable()
export class EventApiService {
    constructor(
        private readonly light: LightService,
        private readonly sound: SoundService,
        private readonly state: StateService,
        private readonly power: PowerService
    ) { }

    public async handleFireEmp() {
        return new Promise<void>(async (resolve) => {
            this.sound.announcementTrack.stop();
            this.sound.announcementTrack.stop();
            this.sound.announcementTrack.play('assets/wav/event/emp.wav');
            setTimeout(() => {
                console.log('EMP event triggered');
                this.power.changePowerPlantState(PowerPlantState.STATE_OFFLINE);
                resolve();
            }, 8000);
        })
    }
}