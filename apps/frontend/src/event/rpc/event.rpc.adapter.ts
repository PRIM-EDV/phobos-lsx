import { Injectable } from "@angular/core";
import { Request } from "@phobos-lsx/protocol";
import { LsxGateway } from "../../infrastructure/lsx.gateway";

@Injectable({
  providedIn: 'root'
})
export class EventRpcAdapter {
  constructor(
    private readonly gateway: LsxGateway
  ) {}

  public async fireEmp() {
    const request: Request = {
        fireEmp: {}
    }

    await this.gateway.request(request);
  }
}