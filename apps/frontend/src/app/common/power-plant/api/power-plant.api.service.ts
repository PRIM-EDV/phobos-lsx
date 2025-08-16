import { Injectable } from "@angular/core";
import { LsxRequestHandler } from "../../../infrastructure/rpc/lsx-request-handler.base";
import { SetPowerPlantState_Request } from "@phobos-lsx/protocol";
import { PowerPlantService } from "../power-plant.service";

@Injectable({
  providedIn: "root",
})
export class PowerPlantApiService extends LsxRequestHandler {
  constructor(
    private readonly service: PowerPlantService
  ) {
    super();
  }

  private setPowerPlantState(request: SetPowerPlantState_Request): void {
    this.service.powerPlantState.set(request.state);
  }
}