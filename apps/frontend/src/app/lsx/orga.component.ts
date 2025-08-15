import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { PhSidebar, PhSidebarItem, PhTopbar, PhTopbarItem, PhTopbarHeader, PhWindow } from "@phobos/elements";
import { BaseLockdownComponent } from "../base-lockdown/base-lockdown.component";
import { SpeakerAnnouncementsComponent } from "../common/speaker-announcements/speaker-announcements.component";
import { DeviceControlComponent } from "../device-control/device-control.component";
import { DroneBombardmentComponent } from "../drone-bombardment/drone-bombardment.component";
import { DroneControlComponent } from "../drone-control/drone-control.component";
import { LightControlComponent } from "../light-control/light-control.component";
import { PowerPlantComponent } from "../power-plant/power-plant.component";
import { SpeakerFluffComponent } from "../common/speaker-fluff/speaker-fluff.component";

@Component({
    selector: 'app-orga',
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
      PhWindow
    ],
    templateUrl: './orga.component.html',
    styleUrls: ['./orga.component.scss']
})
export class OrgaComponent {

}
