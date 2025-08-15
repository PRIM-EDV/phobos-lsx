import { Inject, Injectable, Optional } from "@angular/core";
import { AUTHZ_SERVICE_TOKEN, IAuthzService } from "@phobos/core";
import { Request, Response } from "@phobos-lsx/protocol";

import { LsxGateway } from "../../../infrastructure/lsx.gateway";

@Injectable({ providedIn: "root" })
export class SpeakerAnnouncementsRpcAdapter {

  private tecFiles: string[] = [
    "TEC_01-11.wav",
    "TEC_01-21.wav",
    "TEC_0131.wav",
    "TEC_02-11.wav",
    "blackout.wav",
    "blackout_over.wav",
  ];

  constructor(
    private readonly gateway: LsxGateway,
    @Optional() @Inject(AUTHZ_SERVICE_TOKEN) private authz: IAuthzService
  ) { }

  public async getAnnouncementFiles(): Promise<string[]> {
    const request: Request = {
      getAnnouncementFiles: {}
    };
    const response = await this.gateway.request(request);

    if (this.authz && this.authz.hasRole("admin")) {
      return response.getAnnouncementFiles?.files || [];
    } else {
      return this.tecFiles;
    }
  }

  public async playAnnoucement(file: string) {
    const req: Request = {
        playAnnouncement: {filepath: `assets/wav/triggered/${file}`}
    }

    await this.gateway.request(req);
  }
}