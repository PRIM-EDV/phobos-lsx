import { Component } from "@angular/core";
import { PhWindow } from "@phobos/elements";
import { PowerPlantComponent } from "../common/power-plant/power-plant.component";
import { PowerControlComponent } from "../common/power-control/power-control.component";
import { LightControlComponent } from "../common/light-control/light-control.component";
import { SpeakerAnnouncementsComponent } from "../common/speaker-announcements/speaker-announcements.component";

@Component({
  selector: "app-technical",
  imports: [
    LightControlComponent,
    PowerControlComponent,
    PowerPlantComponent,
    PhWindow,
    SpeakerAnnouncementsComponent
  ],
  templateUrl: "./technical.component.html",
  styleUrls: ["./technical.component.scss"]
})
export class TechnicalComponent {
  // Component logic goes here
}