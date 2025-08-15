import { Injectable } from '@nestjs/common';
import { ModeSilentState, PowerPlantState, BombAreaId, BombAreaState } from '@phobos-lsx/protocol';


@Injectable()
export class StateService {

    public modeSilentState: ModeSilentState = ModeSilentState.MODE_SILENT_STATE_NORMAL;

    // public powerLineStates = new Map<PowerLineId, PowerLineState>([
    //     [PowerLineId.LINE_OG_BASE_CIC, PowerLineState.STATE_POWERED],
    //     [PowerLineId.LINE_OG_BASE_MED, PowerLineState.STATE_POWERED],
    //     [PowerLineId.LINE_OG_BASE_SCI, PowerLineState.STATE_POWERED],
    //     [PowerLineId.LINE_OG_BASE_TEC, PowerLineState.STATE_POWERED],
    //     [PowerLineId.LINE_OG_BASE_HC, PowerLineState.STATE_POWERED],
    //     [PowerLineId.LINE_OG_GATE, PowerLineState.STATE_POWERED],
    //     [PowerLineId.LINE_OG_MESSHALL, PowerLineState.STATE_POWERED],
    //     [PowerLineId.LINE_OG_COURTYARD, PowerLineState.STATE_POWERED],
    //     [PowerLineId.LINE_OG_PARCELS, PowerLineState.STATE_POWERED],
    //     [PowerLineId.LINE_OG_BASE_ADM, PowerLineState.STATE_POWERED],
    //     [PowerLineId.LINE_OG_LOG, PowerLineState.STATE_POWERED],
    //     [PowerLineId.LINE_UG_HALL, PowerLineState.STATE_POWERED]
    // ]);

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