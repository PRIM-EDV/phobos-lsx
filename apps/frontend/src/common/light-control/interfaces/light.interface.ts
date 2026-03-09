import { LightId, LightDMXState, LightSwitchState, PowerState, LockState } from "@phobos-lsx/protocol";

export interface Light {
  id: LightId;
  label: string;
  dmxState: LightDMXState;
  switchState: LightSwitchState;
  powerState: PowerState;
  lockState: LockState;
}
