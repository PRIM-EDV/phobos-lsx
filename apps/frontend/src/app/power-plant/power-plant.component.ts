import { Component, OnInit } from '@angular/core';
import { Request, Response } from 'proto/lsx';
import { PowerPlantState } from 'proto/lsx.power';
import { BackendService } from '../backend/backend.service';
import { PowerPlantService } from './power-plant.service';

@Component({
    selector: 'app-power-plant',
    templateUrl: './power-plant.component.html',
    styleUrls: ['./power-plant.component.scss'],
    standalone: false
})
export class PowerPlantComponent implements OnInit {

  public powerPlantState: string | number = 'normal';

  constructor(private readonly backend: BackendService, private readonly powerPlantService: PowerPlantService) {
    this.backend.onOpen.subscribe(async () => {
      const powerPlantState = await this.powerPlantService.getPowerPlantState();
      this.updateLocalPowerPlantState(powerPlantState);
    });
    this.backend.onRequest.subscribe(this.handleRequest.bind(this));
  }

  ngOnInit(): void {
    if (this.backend.isConnected) {
      this.powerPlantService.getPowerPlantState().then((state) => {this.updateLocalPowerPlantState(state)});
    }
  }

  public async updateLocalPowerPlantState(powerPlantState: PowerPlantState){
    switch(powerPlantState) {
      case PowerPlantState.STATE_NORMAL: this.powerPlantState = 'normal'; break;
      case PowerPlantState.STATE_OFFLINE: this.powerPlantState = 'offline'; break;
      case PowerPlantState.STATE_CRITICAL: this.powerPlantState = 'critical'; break;
      case PowerPlantState.STATE_POWER_SAVING: this.powerPlantState = 'low'; break;
    }
  }

  public async updateServerPowerGridState() {
    switch(this.powerPlantState) {
      case 'normal': await this.powerPlantService.setPowerPlantState(PowerPlantState.STATE_NORMAL); break;
      case 'critical': await this.powerPlantService.setPowerPlantState(PowerPlantState.STATE_CRITICAL); break;
      case 'low': await this.powerPlantService.setPowerPlantState(PowerPlantState.STATE_POWER_SAVING); break;
      case 'offline': await this.powerPlantService.setPowerPlantState(PowerPlantState.STATE_OFFLINE); break;
    }
  }

  private handleRequest(event: {id: string, request: Request}) {
    if(event.request.setPowerPlantState) {
      this.updateLocalPowerPlantState(event.request.setPowerPlantState.state!);
      this.backend.respond(event.id, {setPowerPlantState: {}})
    }
  }

}
