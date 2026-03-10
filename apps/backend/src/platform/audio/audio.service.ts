import { Injectable } from "@nestjs/common";
import { Track } from "./common/track";
import { platform } from "os";

import { AplayTrack } from "./linux/aplay.track";
import { WmpTrack } from "./windows/wmp.track";

@Injectable()
export class AudioService {
    constructor() {

    }

    public createTrack(): Track {
        if (platform() === 'linux') {
            return new AplayTrack();
        } if (platform() === 'win32') {
            return new WmpTrack();
        } 
        else {
            throw new Error('Unsupported platform');
        }
    }
}