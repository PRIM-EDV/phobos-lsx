import { Injectable } from '@angular/core';
import { BackendService } from '../infrastructure/backend.service';
import { PowerPlantState, Request, Response } from '@phobos-lsx/protocol';

@Injectable({
  providedIn: 'root'
})
export class PowerPlantService {

  constructor(private readonly backend: BackendService) { }

  public async getPowerPlantState(): Promise<PowerPlantState> {
    const req: Request = {
      getPowerPlantState: {}
    }

    const res: Response = await this.backend.request(req);
    return res.getPowerPlantState!.state!;
  }

  public async setPowerPlantState(state: PowerPlantState) {
    const req: Request = {
      setPowerPlantState: { state: state }
    }

    const res: Response = await this.backend.request(req);
  }
}
