import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { PhWindow } from "@phobos/elements";
import { SpeakerAnnouncementsComponent } from "../common/speaker-announcements/speaker-announcements.component";
import { PowerPlantComponent } from "../power-plant/power-plant.component";
import { SpeakerFluffComponent } from "../common/speaker-fluff/speaker-fluff.component";
import { LightControlComponent } from "../common/light-control/light-control.component";
import { PowerControlComponent } from "../common/power-control/power-control.component";
import { BaseLockdownComponent } from "../common/base-lockdown/base-lockdown.component";

@Component({
    selector: 'app-general',
    imports: [
      CommonModule,
      PowerPlantComponent,
      LightControlComponent,
      BaseLockdownComponent,
      SpeakerAnnouncementsComponent,
      SpeakerFluffComponent,
      PowerControlComponent,
      PhWindow
    ],
    templateUrl: './general.component.html',
    styleUrls: ['./general.component.scss']
})
export class GeneralComponent {

}
