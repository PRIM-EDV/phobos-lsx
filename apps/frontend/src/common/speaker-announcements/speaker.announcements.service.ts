import { effect, Inject, Injectable, Optional, signal, WritableSignal } from "@angular/core";
import { SpeakerAnnouncementsRpcAdapter } from "./rpc/speaker-annoucements.rpc.adapter";
import { LsxGateway } from "../../infrastructure/lsx.gateway";
import { AUTHZ_SERVICE_TOKEN, IAuthzService } from "@phobos/core";

const TEC_FILES = [
  "blackout.wav",
  "blackout_over.wav",
  "TEC_01-11.wav",
  "TEC_01-21.wav",
  "TEC_0131.wav",
  "TEC_02-11.wav"
]

@Injectable({
  providedIn: "root"
})
export class SpeakerAnnouncementsService {

  public announcementFiles: WritableSignal<string[]> = signal([]);

  announcementFilesInit = effect(async () => {
    if (this.gateway.isConnected()) {
      if (this.authz && this.authz.hasRole('admin')) {
        const announcementFiles = await this.rpc.getAnnouncementFiles();
        this.announcementFiles.set(announcementFiles);
      } else {
        this.announcementFiles.set(TEC_FILES);
      }
    }
  });

  constructor(
    private readonly gateway: LsxGateway, 
    private readonly rpc: SpeakerAnnouncementsRpcAdapter,
    @Optional() @Inject(AUTHZ_SERVICE_TOKEN) private authz: IAuthzService
  ) { }
}
