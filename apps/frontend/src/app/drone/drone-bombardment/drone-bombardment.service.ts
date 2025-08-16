import { Injectable } from '@angular/core';
import { BombAreaId, BombAreaState, Request, Response } from '@phobos-lsx/protocol';

@Injectable({
  providedIn: 'root'
})
export class DroneBombardmentService {

  constructor() { }

  // public async getBombAreaState(id: BombAreaId): Promise<BombAreaState> {
  //   const req: Request = {
  //     getBombAreaState: {id: id}
  //   }

  //   const res: Response = await this.backend.request(req);
  //   return res.getBombAreaState!.state!;
  // }

  // public async bombArea(id: BombAreaId) {
  //   const req: Request = {
  //     bombArea: {id: id}
  //   }

  //   const res: Response = await this.backend.request(req);
  //   return res.bombArea;
  // }
}
