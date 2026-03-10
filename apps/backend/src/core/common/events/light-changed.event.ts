import { LightId, LightDMXState } from "@phobos-lsx/protocol";

export class LightChangedEvent {
    id: LightId;
    state: LightDMXState;

    constructor(id: LightId, state: LightDMXState) {
        this.id = id;
        this.state = state;
    }
}