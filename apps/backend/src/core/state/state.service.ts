import { Injectable } from '@nestjs/common';
import { ModeSilentState, PowerPlantState, BombAreaId, BombAreaState, LockdownState } from '@phobos-lsx/protocol';


@Injectable()
export class StateService {

    public lockdownState: LockdownState = LockdownState.LOCKDOWN_STATE_NORMAL;
    public modeSilentState: ModeSilentState = ModeSilentState.MODE_SILENT_STATE_NORMAL;
    public powerPlantState: PowerPlantState = PowerPlantState.STATE_NORMAL;

    public bombAreaStates = new Map<BombAreaId, BombAreaState>([
        [BombAreaId.AREA_CORRIDOR, BombAreaState.STATE_ARMED],
        [BombAreaId.AREA_MED, BombAreaState.STATE_ARMED],
        [BombAreaId.AREA_CIC, BombAreaState.STATE_ARMED],
        [BombAreaId.AREA_HALL, BombAreaState.STATE_ARMED],
        [BombAreaId.AREA_SCI, BombAreaState.STATE_ARMED],
        [BombAreaId.AREA_TEC, BombAreaState.STATE_ARMED],
        [BombAreaId.AREA_PARCEL, BombAreaState.STATE_ARMED],
        [BombAreaId.AREA_TUNNEL, BombAreaState.STATE_ARMED]
      ]); 
}