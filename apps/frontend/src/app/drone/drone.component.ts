import { Component } from "@angular/core";
import { PhWindow } from "@phobos/elements";
import { DroneControlComponent } from "./drone-control/drone-control.component";
import { DroneBombardmentComponent } from "./drone-bombardment/drone-bombardment.component";

@Component({
  selector: 'app-drone',
  imports: [
    DroneControlComponent,
    DroneBombardmentComponent,
    PhWindow
  ],
  templateUrl: './drone.component.html',
  styleUrls: ['./drone.component.scss']
})
export class DroneComponent {

}
