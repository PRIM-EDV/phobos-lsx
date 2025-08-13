import { Injectable } from '@angular/core';
import { Response } from 'proto/lsx';
import { BackendService } from '../backend/backend.service';

@Injectable({
  providedIn: 'root'
})
export class PowerControlService {

  constructor(private readonly backend: BackendService) { }

  public async getPowerGridState(id: any): Promise<any> {
    // const req: Request = {
    //     getPowerLineState: {
    //         id: id
    //     }
    // }

    // const res: Response = await this.backend.request(req);
    // return res.getPowerLineState!.state!;
  }

  public async setPowerLineState(id: any, state: any) {
    // const req: Request = {
    //     setPowerLineState: {
    //         id: id, 
    //         state: state 
    //     }
    // }

    // const res: Response = await this.backend.request(any);
  }
}
