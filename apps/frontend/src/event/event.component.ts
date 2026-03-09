import { Component } from "@angular/core";
import { EventRpcAdapter } from "./rpc/event.rpc.adapter";

@Component({
  selector: "app-event",
  templateUrl: "./event.component.html",
  styleUrls: ["./event.component.scss"]
})
export class EventComponent {
  constructor(
    public readonly rpc: EventRpcAdapter   
  ) {

  }
}