import { Injectable } from '@angular/core';
import { Request, Response } from 'proto/lsx';
import { BackendService } from '../backend/backend.service';
import { BombAreaState, BombArea, BombAreaId, ModeSilentState } from 'proto/lsx.drone';

@Injectable({
  providedIn: 'root'
})
export class DroneBombardmentService {

  constructor(private readonly backend: BackendService) { }

  public async getBombAreaState(id: BombAreaId): Promise<BombAreaState> {
    const req: Request = {
      getBombAreaState: {id: id}
    }

    const res: Response = await this.backend.request(req);
    return res.getBombAreaState!.state!;
  }

  public async bombArea(id: BombAreaId) {
    const req: Request = {
      bombArea: {id: id}
    }

    const res: Response = await this.backend.request(req);
    return res.bombArea;
  }
}
