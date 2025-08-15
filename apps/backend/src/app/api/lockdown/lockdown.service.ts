import { Injectable } from '@nestjs/common';
import { LockdownState, LightMode, ModeSilentState } from '@phobos-lsx/protocol';

import { LightService } from 'src/app/core/light/light.service';
import { StateService } from 'src/app/core/state/state.service';
import { SoundService } from 'src/app/core/sound/sound.service';

@Injectable()
export class LockdownService {

    public lockdownState: LockdownState = LockdownState.LOCKDOWN_STATE_NORMAL;
    public autoLockdown = true;
    public lockdownAnnouncements = true;

    constructor(private readonly sound: SoundService, private state: StateService, private light: LightService) {
        setInterval(this.lockdownAnnoucementsInterval.bind(this), 1000);
        setInterval(this.autoLockdownInterval.bind(this), 1000);
    }

    public setLockdownState(state: LockdownState) {
        this.handleBaseStateChange(state);
        this.lockdownState = state;
    }

    public setAutoLockdown(state: boolean) {
        this.autoLockdown = state;
    }

    public setLockdownAnnouncements(state: boolean) {
        this.lockdownAnnouncements = state;
    }

    private async handleBaseStateChange(state: LockdownState) {
        switch(state) {
            case LockdownState.LOCKDOWN_STATE_NORMAL:
                if(this.lockdownAnnouncements) {
                    this.sound.announcementTrack.play('assets/wav/lockdown-timer/lockdown-vorbei.wav').then( () => {
                        this.light.lightlines.forEach(async (lightline) => {this.light.setLightMode(lightline.id, LightMode.LIGHT_MODE_WHITE)});
                    }
                    ).catch((err) =>{console.log(err)});
                } else {
                    this.light.lightlines.forEach(async (lightline) => {this.light.setLightMode(lightline.id, LightMode.LIGHT_MODE_WHITE)});
                } break;

            case LockdownState.LOCKDOWN_STATE_LOCKDOWN:
                if (this.lockdownAnnouncements) {
                    this.sound.announcementTrack.play('assets/wav/lockdown-timer/lockdown-now.wav').then( () => {
                        this.light.lightlines.forEach(async (lightline) => {this.light.setLightMode(lightline.id, LightMode.LIGHT_MODE_RED)});
                    }
                    ).catch((err) =>{console.log(err)});
                } else {
                    this.light.lightlines.forEach(async (lightline) => {this.light.setLightMode(lightline.id, LightMode.LIGHT_MODE_RED)});
                } break;

        }
    }

    private lockdownAnnoucementsInterval() {
        const d = new Date();
        const hours = d.getHours();
        const minutes = d.getMinutes();
        const seconds = d.getSeconds();

        if (this.lockdownAnnouncements && this.state.modeSilentState == ModeSilentState.MODE_SILENT_STATE_NORMAL) {
            if (minutes == 0 && seconds == 0) {
                switch(hours) {
                    case 0: this.sound.announcementTrack.play('assets/wav/lockdown-timer/lockdown-3h.wav'); break;
                    case 1: this.sound.announcementTrack.play('assets/wav/lockdown-timer/lockdown-2h.wav'); break;
                    case 2: this.sound.announcementTrack.play('assets/wav/lockdown-timer/lockdown-1h.wav'); break;
                    case 10: this.sound.announcementTrack.play('assets/wav/lockdown-timer/lockdown-17h.wav'); break;
                    case 11: this.sound.announcementTrack.play('assets/wav/lockdown-timer/lockdown-16h.wav'); break;
                    case 12: this.sound.announcementTrack.play('assets/wav/lockdown-timer/lockdown-15h.wav'); break;
                    case 13: this.sound.announcementTrack.play('assets/wav/lockdown-timer/lockdown-14h.wav'); break;
                    case 14: this.sound.announcementTrack.play('assets/wav/lockdown-timer/lockdown-13h.wav'); break;
                    case 15: this.sound.announcementTrack.play('assets/wav/lockdown-timer/lockdown-12h.wav'); break;
                    case 16: this.sound.announcementTrack.play('assets/wav/lockdown-timer/lockdown-11h.wav'); break;
                    case 17: this.sound.announcementTrack.play('assets/wav/lockdown-timer/lockdown-10h.wav'); break;
                    case 18: this.sound.announcementTrack.play('assets/wav/lockdown-timer/lockdown-9h.wav'); break;
                    case 19: this.sound.announcementTrack.play('assets/wav/lockdown-timer/lockdown-8h.wav'); break;
                    case 20: this.sound.announcementTrack.play('assets/wav/lockdown-timer/lockdown-7h.wav'); break;
                    case 21: this.sound.announcementTrack.play('assets/wav/lockdown-timer/lockdown-6h.wav'); break;
                    case 22: this.sound.announcementTrack.play('assets/wav/lockdown-timer/lockdown-5h.wav'); break;
                    case 23: this.sound.announcementTrack.play('assets/wav/lockdown-timer/lockdown-4h.wav'); break;
                }
            } else if (hours == 2 && seconds == 0) {
                switch(minutes) {
                    case 30: this.sound.announcementTrack.play('assets/wav/lockdown-timer/lockdown-30m.wav'); break;
                    case 55: this.sound.announcementTrack.play('assets/wav/lockdown-timer/lockdown-5m.wav'); break;
                }
            }
        }
    }

    private autoLockdownInterval() {
        const d = new Date();
        const hours = d.getHours();
        const minutes = d.getMinutes();
        const seconds = d.getSeconds();

        if (this.autoLockdown) {
            if (minutes == 0 && seconds == 0) {
                switch(hours) {
                    case 3: this.setLockdownState(LockdownState.LOCKDOWN_STATE_LOCKDOWN); break;
                    case 9: this.setLockdownState(LockdownState.LOCKDOWN_STATE_NORMAL); break;
                }
            }
        }
    }
}
