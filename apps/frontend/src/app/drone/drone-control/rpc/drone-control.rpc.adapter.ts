import { Injectable } from "@angular/core";
import { BombAreaId, ModeSilentState, Request } from "@phobos-lsx/protocol";

import { LsxGateway } from "../../../infrastructure/lsx.gateway";

@Injectable({
  providedIn: 'root'
})
export class DroneControlRpcAdapter {

  constructor(
    private readonly gateway: LsxGateway
  ) { }

  /**
   * 
   * @param area 
   */
  public async bombArea(area: BombAreaId) {
    const request: Request = {
      bombArea: { id: area }
    }

    await this.gateway.request(request);
  }

  /**
   * 
   */
  public async bombBase() {
    const request: Request = {
        bombBase: {}
    }

    await this.gateway.request(request);
  }

  /**
   * Gets the mode silent state.
   * @returns The mode silent state.
   */
  public async getModeSilentState(): Promise<ModeSilentState> {
    const request: Request = {
      getModeSilentState: {}
    }

    const response = await this.gateway.request(request);
    return response.getModeSilentState!.state;
  }

  /**
   * Plays an announcement sound.
   * @param file The name of the sound file to play.
   */
  public async playSound(file: string) {
    const req: Request = {
      playAnnouncement: { filepath: `assets/wav/drone/${file}` }
    }

    await this.gateway.request(req);
  }

  /**
   * Sets the mode silent state.
   * @param state The mode silent state.
   */
  public async setModeSilentState(state: ModeSilentState) {
    const request: Request = {
      setModeSilentState: { state: state }
    }

    const response = await this.gateway.request(request);
  }
}
