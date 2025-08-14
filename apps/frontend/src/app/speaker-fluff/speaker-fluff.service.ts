import { Injectable } from '@angular/core';
import { BackendService } from '../infrastructure/backend.service';
import { Request, Response } from '@phobos-lsx/protocol';

@Injectable({
  providedIn: 'root'
})
export class SpeakerFluffService {

  constructor(private readonly backend: BackendService) { }

  public async getFluffFiles(): Promise<string[]> {
    const req: Request = {
        getFluffFiles: {}
    }
    const res: Response = await this.backend.request(req);
    return res.getFluffFiles!.files!;
  }

  public async getFluffState(): Promise<boolean> {
    const req: Request = {
        getFluffState: {}
    }

    const res: Response = await this.backend.request(req);
    return res.getFluffState!.state!;
  }

  public async setFluffState(state: boolean): Promise<void> {
    const req: Request = {
        setFluffState: {state: state}
    }

    const res: Response = await this.backend.request(req);
  }

}
