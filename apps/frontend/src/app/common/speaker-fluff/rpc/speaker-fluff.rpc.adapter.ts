import { Inject, Injectable, Optional } from "@angular/core";
import { AUTHZ_SERVICE_TOKEN, IAuthzService } from "@phobos/core";
import { Request, Response } from "@phobos-lsx/protocol";
import { LsxGateway } from "../../../infrastructure/lsx.gateway";

@Injectable({
  providedIn: 'root'
})
export class SpeakerFluffRpcAdapter {

  constructor(
    private readonly gateway: LsxGateway,
    @Optional() @Inject(AUTHZ_SERVICE_TOKEN) private authz: IAuthzService
  ) { }


  public async getFluffFiles(): Promise<string[]> {
    const request: Request = {
      getFluffFiles: {}
    }
    const response: Response = await this.gateway.request(request);
    return response.getFluffFiles?.files || [];
  }

  public async getFluffState(): Promise<boolean> {
    const request: Request = {
      getFluffState: {}
    }

    const response: Response = await this.gateway.request(request);
    return response.getFluffState!.state!;
  }

  public async setFluffState(state: boolean): Promise<void> {
    const request: Request = {
      setFluffState: { state: state }
    }

    const response: Response = await this.gateway.request(request);
  }

  public async playAnnouncement(file: string) {
    console.log(`Playing fluff file: ${file}`);
    const req: Request = {
        playAnnouncement: {filepath: `assets/wav/fluff/${file}`}
    }

    await this.gateway.request(req);
  }
}
