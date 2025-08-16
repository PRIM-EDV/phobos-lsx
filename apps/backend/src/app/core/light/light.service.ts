import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { LightId, LightDMXState, PowerState, LightSwitchState, LockState, LightMode } from '@phobos-lsx/protocol';

import { Lightline } from './lightline/lightline';
import { QlcService } from 'src/app/platform/qlc/qlc.service';
import { StateService } from '../state/state.service';
import { LightChangedEvent } from '../common/events/light-changed.event';
import { ILightRpcAdapter } from '../common/interfaces/light.rpc.adapter.interface';

const LightRpcAdapter = () => Inject('LightRpcAdapter');

@Injectable()
export class LightService {

    public lightlines =  new Map<LightId, Lightline>([
        [LightId.LIGHT_OG_BASE_ADM, new Lightline(1, 2, LightId.LIGHT_OG_BASE_ADM, new Map([
            [LightDMXState.DMX_STATE_OFF, 0],
            [LightDMXState.DMX_STATE_RED, 2],
            [LightDMXState.DMX_STATE_WHITE, 3]
        ]))],
        [LightId.LIGHT_OG_MESSHALL, new Lightline(3, 4, LightId.LIGHT_OG_MESSHALL, new Map([
            [LightDMXState.DMX_STATE_OFF, 0],
            [LightDMXState.DMX_STATE_RED, 1],
            [LightDMXState.DMX_STATE_WHITE, 2]
        ]))],
        [LightId.LIGHT_OG_BASE_MED, new Lightline(5, 6, LightId.LIGHT_OG_BASE_MED, new Map([
            [LightDMXState.DMX_STATE_OFF, 0],
            [LightDMXState.DMX_STATE_RED, 1],
            [LightDMXState.DMX_STATE_WHITE, 4]
        ]))],
        [LightId.LIGHT_OG_BASE_CIC, new Lightline(7, 8, LightId.LIGHT_OG_BASE_CIC, new Map([
            [LightDMXState.DMX_STATE_OFF, 0],
            [LightDMXState.DMX_STATE_RED, 2],
            [LightDMXState.DMX_STATE_WHITE, 3]
        ]))],
        [LightId.LIGHT_OG_BASE_FC, new Lightline(9, 10, LightId.LIGHT_OG_BASE_FC, new Map([
            [LightDMXState.DMX_STATE_OFF, 0],
            [LightDMXState.DMX_STATE_RED, 1],
            [LightDMXState.DMX_STATE_WHITE, 2]
        ]))],
        [LightId.LIGHT_OG_BASE_SCI, new Lightline(11, 12, LightId.LIGHT_OG_BASE_SCI, new Map([
            [LightDMXState.DMX_STATE_OFF, 0],
            [LightDMXState.DMX_STATE_RED, 2],
            [LightDMXState.DMX_STATE_WHITE, 3]
        ]))],
        [LightId.LIGHT_OG_HALL, new Lightline(13, 14, LightId.LIGHT_OG_HALL, new Map([
            [LightDMXState.DMX_STATE_OFF, 0],
            [LightDMXState.DMX_STATE_RED, 1],
            [LightDMXState.DMX_STATE_WHITE, 2]
        ]))],
        [LightId.LIGHT_OG_COURTYARD, new Lightline(15, 17, LightId.LIGHT_OG_COURTYARD, new Map([
            [LightDMXState.DMX_STATE_OFF, 0],
            [LightDMXState.DMX_STATE_RED, 1],
            [LightDMXState.DMX_STATE_WHITE, 2]
        ]))],
        [LightId.LIGHT_OG_BASE_HC, new Lightline(18, 19, LightId.LIGHT_OG_BASE_HC, new Map([
            [LightDMXState.DMX_STATE_OFF, 0],
            [LightDMXState.DMX_STATE_RED, 1],
            [LightDMXState.DMX_STATE_WHITE, 2]
        ]))],
        [LightId.LIGHT_OG_LOG, new Lightline(20, 21, LightId.LIGHT_OG_LOG, new Map([
            [LightDMXState.DMX_STATE_OFF, 0],
            [LightDMXState.DMX_STATE_RED, 1],
            [LightDMXState.DMX_STATE_WHITE, 2]
        ]))],
        [LightId.LIGHT_OG_PARCELS, new Lightline(22, 23, LightId.LIGHT_OG_PARCELS, new Map([
            [LightDMXState.DMX_STATE_OFF, 0],
            [LightDMXState.DMX_STATE_WHITE, 1]
        ]))],
        [LightId.LIGHT_OG_GATE, new Lightline(24, 25, LightId.LIGHT_OG_GATE, new Map([
            [LightDMXState.DMX_STATE_OFF, 0],
            [LightDMXState.DMX_STATE_RED, 1],
            [LightDMXState.DMX_STATE_WHITE, 2]
        ]))],
        [LightId.LIGHT_UG_RWALL, new Lightline(26, 27, LightId.LIGHT_UG_RWALL, new Map([
            [LightDMXState.DMX_STATE_OFF, 0],
            [LightDMXState.DMX_STATE_RED, 1],
            [LightDMXState.DMX_STATE_WHITE, 2]
        ]))],
        [LightId.LIGHT_UG_BASE_SEC, new Lightline(28, 29, LightId.LIGHT_UG_BASE_SEC, new Map([
            [LightDMXState.DMX_STATE_OFF, 0],
            [LightDMXState.DMX_STATE_RED, 1],
            [LightDMXState.DMX_STATE_WHITE, 2]
        ]))],
        [LightId.LIGHT_OG_BASE_TEC, new Lightline(30, 31, LightId.LIGHT_OG_BASE_TEC, new Map([
            [LightDMXState.DMX_STATE_OFF, 0],
            [LightDMXState.DMX_STATE_RED, 2],
            [LightDMXState.DMX_STATE_WHITE, 3]
        ]))],
        [LightId.LIGHT_TUNNEL, new Lightline(32, 33, LightId.LIGHT_TUNNEL, new Map([
            [LightDMXState.DMX_STATE_OFF, 0],
            [LightDMXState.DMX_STATE_RED, 1],
            [LightDMXState.DMX_STATE_WHITE, 2]
        ]))],
        [LightId.LIGHT_UG_HALL, new Lightline(34, 35, LightId.LIGHT_UG_HALL, new Map([
            [LightDMXState.DMX_STATE_OFF, 0],
            [LightDMXState.DMX_STATE_RED, 1],
            [LightDMXState.DMX_STATE_WHITE, 2]
        ]))]
        ]
        // [LightId.LIGHT_OG_BASE_CIC, new Lightline(5, 8, LightId.LIGHT_OG_BASE_CIC)],
        // [LightId.LIGHT_OG_BASE_HC, new Lightline(18, 19, LightId.LIGHT_OG_BASE_HC)],
        // [LightId.LIGHT_OG_BASE_MED, new Lightline(24, 25, LightId.LIGHT_OG_BASE_MED)],
        // [LightId.LIGHT_OG_BASE_SCI, new Lightline(12, 13, LightId.LIGHT_OG_BASE_SCI, new Map([
        //     [LightDMXState.DMX_STATE_OFF, 0],
        //     [LightDMXState.DMX_STATE_RED, 2],
        //     [LightDMXState.DMX_STATE_WHITE, 1],
        // ]))],
        // [LightId.LIGHT_OG_BASE_TEC, new Lightline(29, 30, LightId.LIGHT_OG_BASE_TEC)],
        // [LightId.LIGHT_OG_COURTYARD, new Lightline(20, 21, LightId.LIGHT_OG_COURTYARD)],
        // [LightId.LIGHT_OG_GATE, new Lightline(3, 4, LightId.LIGHT_OG_GATE)],
        // [LightId.LIGHT_OG_MESSHALL, new Lightline(1, 2, LightId.LIGHT_OG_MESSHALL)],
        // [LightId.LIGHT_OG_LOG, new Lightline(22, 23, LightId.LIGHT_OG_LOG)],
        // [LightId.LIGHT_OG_HALL, new Lightline(15, 16, LightId.LIGHT_OG_HALL)],
        // [LightId.LIGHT_OG_PARCELS, new Lightline(27, 28, LightId.LIGHT_OG_PARCELS, new Map([
        //     [LightDMXState.DMX_STATE_OFF, 0],
        //     [LightDMXState.DMX_STATE_WHITE, 1],
        // ]))],
        // [LightId.LIGHT_OG_TUNNEL, new Lightline(32, 33)],
        // [LightId.LIGHT_UG_HALL, new Lightline(35, 36)],
        // [LightId.LIGHT_UG_RWALL, new Lightline(41, 42)]
    )

    constructor(
        private dmx: QlcService, 
        private state: StateService,
        private eventEmitter: EventEmitter2,
        @LightRpcAdapter() private readonly lightRpcAdapter: ILightRpcAdapter
    ) {
        Lightline.dmx = this.dmx;
        Lightline.eventEmitter = this.eventEmitter;

        // Special
        // this.lightlines.get(LightId.LIGHT_OG_BASE_CIC).specialCue = 9;
        // this.lightlines.get(LightId.LIGHT_OG_BASE_SCI).specialCue = 14;
        // this.lightlines.get(LightId.LIGHT_OG_HALL).specialCue = 17;
        // this.lightlines.get(LightId.LIGHT_OG_BASE_MED).specialCue = 26;
        // this.lightlines.get(LightId.LIGHT_OG_BASE_TEC).specialCue = 31;
        // this.lightlines.get(LightId.LIGHT_OG_TUNNEL).specialCue = 34;
        
    }

    public async setLightDMXState(id: LightId, state: LightDMXState) { 
        const line = this.lightlines.get(id);
        await line.setDmxState(state);
    }

    public async setPowerState(id: LightId, state: PowerState) {
        const line = this.lightlines.get(id);
        await line.setPowerState(state);
    }

    public async getLightPowerState(id: LightId): Promise<PowerState> {
        const line = this.lightlines.get(id);
        return line.powerState;
    }

    public getLightSwitchState(id: LightId): LightSwitchState {
        const line = this.lightlines.get(id);
        return line.switchState;
    }

    public async setLightSwitchState(id: LightId, state: LightSwitchState) { 
        const line = this.lightlines.get(id);
        await line.setSwitchState(state);
    }

    public getLightLockState(id: LightId): LockState {
        const line = this.lightlines.get(id);
        return line.lockState;
    }

    public setLightLockState(id: LightId, state: LockState) {
        const line = this.lightlines.get(id);
        line.lockState = state;
    }

    public getLightLines(): Lightline[] {
        return Array.from(this.lightlines.values());
    }

    public setLightMode(id: LightId, mode: LightMode) {
        const line = this.lightlines.get(id);
        line.setMode(mode);
    }

    public getLightDmxState(id: LightId): LightDMXState {
        const line = this.lightlines.get(id);
        return line.dmxState;
    }

    @OnEvent('light.changed')
    handleLightChangedEvent(light: LightChangedEvent) {
        // this.lightRpcAdapter.setDmxState(light.id, light.state);
    }
}