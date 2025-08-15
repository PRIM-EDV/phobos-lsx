import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { PhWindow } from "@phobos/elements";
import { BaseLockdownComponent } from "../base-lockdown/base-lockdown.component";
import { SpeakerAnnouncementsComponent } from "../common/speaker-announcements/speaker-announcements.component";
import { DroneBombardmentComponent } from "../drone-bombardment/drone-bombardment.component";
import { DroneControlComponent } from "../drone-control/drone-control.component";
import { PowerPlantComponent } from "../power-plant/power-plant.component";
import { SpeakerFluffComponent } from "../common/speaker-fluff/speaker-fluff.component";
import { LightControlComponent } from "../common/light-control/light-control.component";
import { PowerControlComponent } from "../common/power-control/power-control.component";

@Component({
    selector: 'app-general',
    imports: [
      CommonModule,
      BaseLockdownComponent,
      PowerPlantComponent,
      LightControlComponent,
      SpeakerAnnouncementsComponent,
      SpeakerFluffComponent,
      DroneBombardmentComponent,
      DroneControlComponent,
      PowerControlComponent,
      PhWindow
    ],
    templateUrl: './general.component.html',
    styleUrls: ['./general.component.scss']
})
export class GeneralComponent {

}
