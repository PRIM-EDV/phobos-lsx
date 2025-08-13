import { Injectable } from '@angular/core';
import { Request, Response } from 'proto/lsx';
import { PowerPlantState } from 'proto/lsx.power';
import { BackendService } from '../backend/backend.service';

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
