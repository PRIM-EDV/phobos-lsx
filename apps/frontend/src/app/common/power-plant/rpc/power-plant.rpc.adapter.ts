import { Injectable } from "@angular/core";
import { LsxGateway } from "../../../infrastructure/lsx.gateway";
import { PowerPlantState, Request } from "@phobos-lsx/protocol";

@Injectable({
  providedIn: 'root'
})
export class PowerPlantRpcAdapter {

  constructor(
    private readonly gateway: LsxGateway
  ) { }

  /**
   * Get the current state of the power plant.
   * @returns The current state of the power plant.
   */
  public async getPowerPlantState(): Promise<PowerPlantState> {
    const request: Request = {
      getPowerPlantState: {}
    }

    const response = await this.gateway.request(request);
    return response.getPowerPlantState!.state!;
  }

  /**
   * Set the current state of the power plant.
   * @param state The new state of the power plant.
   */
  public async setPowerPlantState(state: PowerPlantState) {
    const request: Request = {
      setPowerPlantState: { state: state }
    }

    const response = await this.gateway.request(request);
  }
}