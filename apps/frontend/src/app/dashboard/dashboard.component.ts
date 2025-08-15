import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';
import { DeviceControlComponent } from '../device-control/device-control.component';
import { LightControlComponent } from '../light-control/light-control.component';

import { PhSidebar, PhSidebarItem, PhTopbar, PhTopbarHeader, PhTopbarItem, PhWindow } from '@phobos/elements';
import { DroneControlComponent } from '../drone-control/drone-control.component';
import { SpeakerFluffComponent } from '../speaker-fluff/speaker-fluff.component';
import { PowerPlantComponent } from '../power-plant/power-plant.component';
import { BaseLockdownComponent } from '../base-lockdown/base-lockdown.component';
import { DroneBombardmentComponent } from '../drone-bombardment/drone-bombardment.component';
import { SpeakerAnnouncementsComponent } from '../common/speaker-announcements/speaker-announcements.component';

@Component({
    selector: 'dashboard',
    imports: [
      CommonModule,
      BaseLockdownComponent,
      LightControlComponent,
      PowerPlantComponent,
      SpeakerAnnouncementsComponent,
      SpeakerFluffComponent,
      DroneBombardmentComponent,
      DroneControlComponent,
      DeviceControlComponent,
      PhSidebar,
      PhSidebarItem,
      PhTopbar,
      PhTopbarItem,
      PhTopbarHeader,
      PhWindow
    ],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    standalone: true
})
export class DashboardComponent implements OnInit {

  public view: string = "DHBRD";
  public tab: string = "GNRL";

  constructor(public readonly auth: AuthService) { }

  ngOnInit(): void {
  }

}
