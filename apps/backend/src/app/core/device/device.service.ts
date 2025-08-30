import { Injectable } from "@nestjs/common";
import { PowerDevice, PowerState } from "@phobos-lsx/protocol";

import { LightService } from "../light/light.service";

@Injectable()
export class DeviceService {

    public powerState = new Map<PowerDevice, PowerState>([
        [PowerDevice.DEVICE_ADM_BASETOOL, PowerState.POWER_STATE_POWERED],
        [PowerDevice.DEVICE_CIC_MAPTOOL, PowerState.POWER_STATE_POWERED],
        [PowerDevice.DEVICE_CIC_COFFEE, PowerState.POWER_STATE_POWERED],
        [PowerDevice.DEVICE_IRD_RAPIDCARE, PowerState.POWER_STATE_POWERED],
        [PowerDevice.DEVICE_MED_OP_ROOM, PowerState.POWER_STATE_POWERED],
    ]);

    constructor(private readonly light: LightService) {

    }

    public getPowerState(id: PowerDevice): PowerState {
        return this.powerState.get(id);
    }

    public setPowerState(id: PowerDevice, state: PowerState) {
        this.powerState.set(id, state);
    }
}