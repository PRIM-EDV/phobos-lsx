import { LightId, LightDMXState } from "@phobos-lsx/protocol";

export interface ILightRpcAdapter {
    setDmxState(id: LightId, state: LightDMXState): Promise<void>;
}