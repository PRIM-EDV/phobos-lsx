import { LightId, LightDMXState, LightSwitchState, PowerState, LockState } from "@phobos-lsx/protocol";

export const lightConfig = {
    lights: [
        { id: LightId.LIGHT_OG_BASE_ADM, label: 'Section ADM', dmxState: LightDMXState.DMX_STATE_OFF, switchState: LightSwitchState.SWITCH_STATE_OFF, powerState: PowerState.POWER_STATE_POWERED, lockState: LockState.LOCK_STATE_UNLOCKED },
        { id: LightId.LIGHT_OG_BASE_CIC, label: 'Section CIC', dmxState: LightDMXState.DMX_STATE_OFF, switchState: LightSwitchState.SWITCH_STATE_OFF, powerState: PowerState.POWER_STATE_POWERED, lockState: LockState.LOCK_STATE_UNLOCKED },
        { id: LightId.LIGHT_OG_BASE_HC, label: 'Section HC', dmxState: LightDMXState.DMX_STATE_OFF, switchState: LightSwitchState.SWITCH_STATE_OFF, powerState: PowerState.POWER_STATE_POWERED, lockState: LockState.LOCK_STATE_UNLOCKED },
        { id: LightId.LIGHT_OG_BASE_MED, label: 'Section MED', dmxState: LightDMXState.DMX_STATE_OFF, switchState: LightSwitchState.SWITCH_STATE_OFF, powerState: PowerState.POWER_STATE_POWERED, lockState: LockState.LOCK_STATE_UNLOCKED },
        { id: LightId.LIGHT_OG_BASE_SCI, label: 'Section SCI', dmxState: LightDMXState.DMX_STATE_OFF, switchState: LightSwitchState.SWITCH_STATE_OFF, powerState: PowerState.POWER_STATE_POWERED, lockState: LockState.LOCK_STATE_UNLOCKED },
        { id: LightId.LIGHT_OG_BASE_TEC, label: 'Section TEC', dmxState: LightDMXState.DMX_STATE_OFF, switchState: LightSwitchState.SWITCH_STATE_OFF, powerState: PowerState.POWER_STATE_POWERED, lockState: LockState.LOCK_STATE_UNLOCKED },
        { id: LightId.LIGHT_OG_BASE_FC, label: 'Section FC', dmxState: LightDMXState.DMX_STATE_OFF, switchState: LightSwitchState.SWITCH_STATE_OFF, powerState: PowerState.POWER_STATE_POWERED, lockState: LockState.LOCK_STATE_UNLOCKED },
        { id: LightId.LIGHT_OG_HALL, label: 'Hall Upper', dmxState: LightDMXState.DMX_STATE_OFF, switchState: LightSwitchState.SWITCH_STATE_OFF, powerState: PowerState.POWER_STATE_POWERED, lockState: LockState.LOCK_STATE_UNLOCKED },
        { id: LightId.LIGHT_OG_PARCELS, label: 'Parcels Upper', dmxState: LightDMXState.DMX_STATE_OFF, switchState: LightSwitchState.SWITCH_STATE_OFF, powerState: PowerState.POWER_STATE_POWERED, lockState: LockState.LOCK_STATE_UNLOCKED },
        { id: LightId.LIGHT_OG_LOG, label: 'Section LOG', dmxState: LightDMXState.DMX_STATE_OFF, switchState: LightSwitchState.SWITCH_STATE_OFF, powerState: PowerState.POWER_STATE_POWERED, lockState: LockState.LOCK_STATE_UNLOCKED },
        { id: LightId.LIGHT_OG_COURTYARD, label: 'Courtyard', dmxState: LightDMXState.DMX_STATE_OFF, switchState: LightSwitchState.SWITCH_STATE_OFF, powerState: PowerState.POWER_STATE_POWERED, lockState: LockState.LOCK_STATE_UNLOCKED },
        { id: LightId.LIGHT_OG_MESSHALL, label: 'Messhall', dmxState: LightDMXState.DMX_STATE_OFF, switchState: LightSwitchState.SWITCH_STATE_OFF, powerState: PowerState.POWER_STATE_POWERED, lockState: LockState.LOCK_STATE_UNLOCKED },
        { id: LightId.LIGHT_OG_GATE, label: 'Gate', dmxState: LightDMXState.DMX_STATE_OFF, switchState: LightSwitchState.SWITCH_STATE_OFF, powerState: PowerState.POWER_STATE_POWERED, lockState: LockState.LOCK_STATE_UNLOCKED },
        { id: LightId.LIGHT_TUNNEL, label: 'Tunnel', dmxState: LightDMXState.DMX_STATE_OFF, switchState: LightSwitchState.SWITCH_STATE_OFF, powerState: PowerState.POWER_STATE_POWERED, lockState: LockState.LOCK_STATE_UNLOCKED },
        { id: LightId.LIGHT_UG_BASE_SEC, label: 'Section SEC', dmxState: LightDMXState.DMX_STATE_OFF, switchState: LightSwitchState.SWITCH_STATE_OFF, powerState: PowerState.POWER_STATE_POWERED, lockState: LockState.LOCK_STATE_UNLOCKED },
        { id: LightId.LIGHT_UG_RWALL, label: 'Rear Wall', dmxState: LightDMXState.DMX_STATE_OFF, switchState: LightSwitchState.SWITCH_STATE_OFF, powerState: PowerState.POWER_STATE_POWERED, lockState: LockState.LOCK_STATE_UNLOCKED },
        { id: LightId.LIGHT_UG_HALL, label: 'Hall Lower', dmxState: LightDMXState.DMX_STATE_OFF, switchState: LightSwitchState.SWITCH_STATE_OFF, powerState: PowerState.POWER_STATE_POWERED, lockState: LockState.LOCK_STATE_UNLOCKED }
    ]
};