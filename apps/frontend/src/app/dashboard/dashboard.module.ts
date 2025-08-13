import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { PowerControlModule } from '../power-control/power-control.module';
import { PowerPlantModule } from '../power-plant/power-plant.module';
import { BaseLockdownModule } from '../base-lockdown/base-lockdown.module';
import { SpeakerAnnouncementsModule } from '../speaker-announcements/speaker-announcements.module';
import { SpeakerFluffModule } from '../speaker-fluff/speaker-fluff.module';
import { DroneControlModule } from '../drone-control/drone-control.module';
import { DroneBombardmentModule } from '../drone-bombardment/drone-bombardment.module';
import { PhElementsModule } from 'lib/phobos-elements/ph-elements.module';
import { LightControlComponent } from '../light-control/light-control.component';
import { DeviceControlComponent } from "../device-control/device-control.component";



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    BaseLockdownModule,
    LightControlComponent,
    PhElementsModule,
    PowerControlModule,
    PowerPlantModule,
    SpeakerAnnouncementsModule,
    SpeakerFluffModule,
    DroneControlModule,
    DroneBombardmentModule,
    DeviceControlComponent
]
})
export class DashboardModule { }
