import { QlcService } from "../qlc.service";

export interface PathwayStaticMapping {
    blackout: number;
    white: number;
    red: number;
}

export class PathwayUnit {
    public staticCue: number;
    public flickerCue: number;

    private dmx: QlcService;
    private mapping: PathwayStaticMapping = {
        blackout: 1,
        red: 2,
        white: 3
    }

    constructor(staticCue: number, flickerCue: number, dmx: QlcService, mapping?: PathwayStaticMapping) {
        this.staticCue = staticCue;
        this.flickerCue = flickerCue;
        this.dmx = dmx;

        if (mapping) {
            this.mapping = mapping;
        }
    }

    public setStatic(mode: 'blackout' | 'white' | 'red') {
        this.dmx.setCue(this.flickerCue, 'STOP');
        this.dmx.setCue(this.staticCue, 'STEP', this.mapping[mode]);
    }

    public setFlicker() {
        this.dmx.setCue(this.staticCue, 'STOP');
        this.dmx.setCue(this.flickerCue, 'PLAY');
    }
}