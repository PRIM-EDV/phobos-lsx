import { Component, OnInit } from '@angular/core';
import { Request, Response } from 'proto/lsx';
import { BombAreaState, BombAreaId } from 'proto/lsx.drone';
import { BackendService } from '../backend/backend.service';
import { DroneBombardmentService } from './drone-bombardment.service';

@Component({
    selector: 'drone-bombardment',
    templateUrl: './drone-bombardment.component.html',
    styleUrls: ['./drone-bombardment.component.scss'],
    standalone: false
})
export class DroneBombardmentComponent implements OnInit {

  public BombAreaId = BombAreaId;
  public BombAreaState = BombAreaState;

  public areaStates = new Map<BombAreaId, BombAreaState>([
      [BombAreaId.AREA_CORRIDOR, BombAreaState.STATE_ARMED],
      [BombAreaId.AREA_MED, BombAreaState.STATE_ARMED],
      [BombAreaId.AREA_CIC, BombAreaState.STATE_ARMED],
      [BombAreaId.AREA_HALL, BombAreaState.STATE_ARMED],
      [BombAreaId.AREA_SCI, BombAreaState.STATE_ARMED],
      [BombAreaId.AREA_TEC, BombAreaState.STATE_ARMED],
      [BombAreaId.AREA_PARCEL, BombAreaState.STATE_ARMED],
      [BombAreaId.AREA_TUNNEL, BombAreaState.STATE_ARMED]
    ]); 

  constructor(private backend: BackendService, private readonly service: DroneBombardmentService) {
    this.backend.onOpen.subscribe(async () => {
        for (const [id, _] of this.areaStates) {
            const state = await this.service.getBombAreaState(id);
            this.areaStates.set(id, state);
        }
      })
  
      this.backend.onRequest.subscribe(this.handleRequest.bind(this));
   }

  ngOnInit(): void {
    if (this.backend.isConnected) {
        for (const [id, _] of this.areaStates) {
            this.service.getBombAreaState(id).then((state) => {
                this.areaStates.set(id, state);
            });
        }
      }
  }

  public async bombArea(id: BombAreaId) {
    await this.service.bombArea(id);
  }

  private handleRequest(event: {id: string, request: Request}) {
    if (event.request.bombArea) {
      const id = event.request.bombArea.id;
      this.areaStates.set(id, BombAreaState.STATE_FUSED);
    }
  }

}
