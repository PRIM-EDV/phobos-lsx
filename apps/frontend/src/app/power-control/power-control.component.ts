import { Component, OnInit } from '@angular/core';
import { Request, Response } from 'proto/lsx';
import { BackendService } from '../backend/backend.service';
import { PowerControlService } from './power-grid.service';

@Component({
    selector: 'app-power-control',
    templateUrl: './power-control.component.html',
    styleUrls: ['./power-control.component.scss'],
    standalone: false
})
export class PowerControlComponent implements OnInit {

  public poweredStateBaseMedicine: boolean = false;
  public poweredStateUpperLeft: boolean = false;
  public poweredStateUpperRight: boolean = false;
  public poweredStateLowerRight: boolean = false;
  public poweredStateLowerLeft: boolean = false;

  public poweredStateAdm: boolean = false;
  public poweredStateCic: boolean = false;
  public poweredStateGal: boolean = false;
  public poweredStateMed: boolean = false;
  public poweredStateRmw: boolean = false;
  public poweredStateSci: boolean = false;
  public poweredStateTec: boolean = false;

  // HTML mapping
//   public PowerLineId = PowerLineId;
//   public PowerLineState = PowerLineState;

//   public powerLineStates = new Map<PowerLineId, PowerLineState>([
//     [PowerLineId.LINE_OG_BASE_CIC, PowerLineState.STATE_POWERED],
//     [PowerLineId.LINE_OG_BASE_MED, PowerLineState.STATE_POWERED],
//     [PowerLineId.LINE_OG_BASE_SCI, PowerLineState.STATE_POWERED],
//     [PowerLineId.LINE_OG_BASE_TEC, PowerLineState.STATE_POWERED],
//     [PowerLineId.LINE_OG_BASE_HC, PowerLineState.STATE_POWERED],
//     [PowerLineId.LINE_OG_GATE, PowerLineState.STATE_POWERED],
//     [PowerLineId.LINE_OG_MESSHALL, PowerLineState.STATE_POWERED],
//     [PowerLineId.LINE_OG_COURTYARD, PowerLineState.STATE_POWERED],
//     [PowerLineId.LINE_OG_PARCELS, PowerLineState.STATE_POWERED],
//     [PowerLineId.LINE_OG_BASE_ADM, PowerLineState.STATE_POWERED],
//     [PowerLineId.LINE_OG_LOG, PowerLineState.STATE_POWERED]
//   ]); 


  constructor(private readonly backend: BackendService, private readonly powerControlService: PowerControlService) { 
    // this.backend.onOpen.subscribe(async () => {
    //   for (const [id, _] of this.powerLineStates) {
    //       const state = await this.powerControlService.getPowerGridState(id);
    //       this.powerLineStates.set(id, state);
    //   }
    // })

    // this.backend.onRequest.subscribe(this.handleRequest.bind(this));
  }

  ngOnInit(): void {
    // if (this.backend.isConnected) {
    //   for (const [id, _] of this.powerLineStates) {
    //     this.powerControlService.getPowerGridState(id).then((state) => this.powerLineStates.set(id, state));
    //   }
    // }
  }

  public async updateLocalPowerLineState(id: any, state: any){
    // this.powerLineStates.set(id, state);
    // console.log(this.powerLineStates.set(id, state))
  }

  public async toggleRemotePowerLineState(id: any) {
    // const state = this.powerLineStates.get(id);
    // switch(state){
    //     case PowerLineState.STATE_POWERED:
    //         await this.powerControlService.setPowerLineState(id, PowerLineState.STATE_UNPOWERED); break;
    //     case PowerLineState.STATE_UNPOWERED:
    //         await this.powerControlService.setPowerLineState(id, PowerLineState.STATE_POWERED); break;
    // }
  }

  private handleRequest(event: {id: string, request: Request}) {
    // if(event.request.setPowerLineState) {
    //   this.updateLocalPowerLineState(event.request.setPowerLineState.id!, event.request.setPowerLineState.state!);
    //   this.backend.respond(event.id, {setPowerLineState: {}})
    // }
  }

}
