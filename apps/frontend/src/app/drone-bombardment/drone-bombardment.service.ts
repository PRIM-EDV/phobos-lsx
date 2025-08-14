import { Injectable } from '@angular/core';
import { BackendService } from '../infrastructure/backend.service';
import { BombAreaId, BombAreaState, Request, Response } from '@phobos-lsx/protocol';

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
