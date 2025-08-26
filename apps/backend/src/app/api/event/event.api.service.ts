import { Injectable } from "@nestjs/common";
import { LightMode, PowerState } from "@phobos-lsx/protocol";
import { LightService } from "src/app/core/light/light.service";
import { SoundService } from "src/app/core/sound/sound.service";
import { StateService } from "src/app/core/state/state.service";

@Injectable()
export class EventApiService {
    constructor(
        private readonly light: LightService,
        private readonly sound: SoundService,   
        private readonly state: StateService,
    ) { }

    public async handleFireEmp() {
        this.sound.announcementTrack.stop();
        this.sound.announcementTrack.stop();
        this.sound.announcementTrack.play('assets/wav/event/emp.wav');
        setTimeout(() => {
            console.log('EMP event triggered');
            this.light.getLightLines().forEach(async (line) => { await line.setPowerState(PowerState.POWER_STATE_UNPOWERED)} );
        }, 8000);
    }
}