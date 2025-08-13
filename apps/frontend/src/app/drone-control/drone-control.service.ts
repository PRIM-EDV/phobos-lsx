import { Injectable } from '@angular/core';
import { Request, Response } from 'proto/lsx';
import { PowerPlantState } from 'proto/lsx.power';
import { BackendService } from '../backend/backend.service';
import { ModeSilentState } from 'proto/lsx.drone';

@Injectable({
  providedIn: 'root'
})
export class DroneCotrolService {

  constructor(private readonly backend: BackendService) { }

  public async getModeSilentState(): Promise<ModeSilentState> {
    const req: Request = {
      getModeSilentState: {}
    }

    const res: Response = await this.backend.request(req);
    return res.getModeSilentState!.state!;
  }

  public async setModeSilentState(state: ModeSilentState) {
    const req: Request = {
      setModeSilentState: { state: state }
    }

    const res: Response = await this.backend.request(req);
  }
}
