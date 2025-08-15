import { effect, Injectable, signal, WritableSignal } from '@angular/core';
import { BackendService } from '../../infrastructure/backend.service';
import { Request, Response } from '@phobos-lsx/protocol';
import { LsxGateway } from '../../infrastructure/lsx.gateway';
import { SpeakerFluffRpcAdapter } from './rpc/speaker-fluff.rpc.adapter';

@Injectable({
  providedIn: 'root'
})
export class SpeakerFluffService {

  public fluffFiles: WritableSignal<string[]> = signal([]);
  public fluffState: WritableSignal<boolean> = signal(true);

  fluffFilesInit = effect(async () => {
    if (this.gateway.isConnected()) {
      const fluffFiles = await this.rpc.getFluffFiles();
      this.fluffFiles.set(fluffFiles);
    }
  });

  fluffStateInit = effect(async () => {
    if (this.gateway.isConnected()) {
      const fluffState = await this.rpc.getFluffState();
      this.fluffState.set(fluffState);
    }
  });

  constructor(private readonly gateway: LsxGateway, private readonly rpc: SpeakerFluffRpcAdapter) {

  }

  public async updateFluffState(state: string) {
    switch (state) {
      case 'on': await this.rpc.setFluffState(true); this.fluffState.set(true); break;
      case 'off': await this.rpc.setFluffState(false); this.fluffState.set(false); break;
    }
  }
}
