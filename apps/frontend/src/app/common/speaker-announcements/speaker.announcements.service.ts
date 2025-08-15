import { effect, Injectable, signal, WritableSignal } from "@angular/core";
import { SpeakerAnnouncementsRpcAdapter } from "./rpc/speaker-annoucements.rpc.adapter";
import { LsxGateway } from "../../infrastructure/lsx.gateway";

@Injectable({
  providedIn: "root"
})
export class SpeakerAnnouncementsService {

  public announcementFiles: WritableSignal<string[]> = signal([]);

  announcementFilesInit = effect(async () => {
    if (this.gateway.isConnected()) {
      const announcementFiles = await this.rpc.getAnnouncementFiles();
      this.announcementFiles.set(announcementFiles);
    }
  });

  constructor(private readonly gateway: LsxGateway, private readonly rpc: SpeakerAnnouncementsRpcAdapter) { 
  }
}
