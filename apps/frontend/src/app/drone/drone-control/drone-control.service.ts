import { effect, Injectable, signal, WritableSignal } from '@angular/core';
import { ModeSilentState, Request, Response } from '@phobos-lsx/protocol';

import { LsxGateway } from '../../infrastructure/lsx.gateway';
import { DroneControlRpcAdapter } from './rpc/drone-control.rpc.adapter';

@Injectable({
  providedIn: 'root'
})
export class DroneControlService {

  public modeSilentState: WritableSignal<ModeSilentState> = signal(ModeSilentState.MODE_SILENT_STATE_NORMAL);

  public droneSounds = [
    {label: "Sonar I", file: "Botsonar_01.wav"},
    {label: "Sonar II", file: "Botsonar_02.wav"},
    {label: "Sonar III", file: "Botsonar_03.wav"},
  ]

  public bombSounds = [
    {label: "Bomb I", file: "Droneshot_01.wav"},
    {label: "Bomb II", file: "Droneshot_02.wav"},
    {label: "Bomb III", file: "Droneshot_03.wav"},
  ]

  private modeSilentStateInit = effect(async () => {
    if (this.gateway.isConnected()) {
      this.modeSilentState.set(await this.rpc.getModeSilentState());
    }
  });

  constructor(
    private readonly gateway: LsxGateway,
    private readonly rpc: DroneControlRpcAdapter
  ) { }

  public async updateModeSilentState(state: string) {
    switch (state) {
      case 'normal':
        await this.rpc.setModeSilentState(ModeSilentState.MODE_SILENT_STATE_NORMAL);
        this.modeSilentState.set(ModeSilentState.MODE_SILENT_STATE_NORMAL);
        break;
      case 'silent':
        await this.rpc.setModeSilentState(ModeSilentState.MODE_SILENT_STATE_SILENT);
        this.modeSilentState.set(ModeSilentState.MODE_SILENT_STATE_SILENT);
        break;
      case 'silent drone':
        await this.rpc.setModeSilentState(ModeSilentState.MODE_SILENT_STATE_SILENT_DRONE);
        this.modeSilentState.set(ModeSilentState.MODE_SILENT_STATE_SILENT_DRONE);
        break;
    }
  }
}
