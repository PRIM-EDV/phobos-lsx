import { Injectable } from "@nestjs/common";
import { QlcWebsocketService } from "./qlc-websocket.service";
import { PathwayUnit } from "./units/pathway.unit";

@Injectable()
export class QlcService {

    public pathwayScience = new PathwayUnit(0, 0, this);

    constructor(private readonly qlc: QlcWebsocketService) {
        this.qlc.onOpen.subscribe(() => {
            this.getCues().then(console.log);
        })
    }

    // public setWidgetValue(widgetId: number, value: number) {
    //     if(this.ws.readyState == WebSocket.OPEN) {
    //     } else {
    //         this.log.error(`Could not set widget value: WebSocket not connected`)
    //     }
    // }

    public async setCue(cueId: number, cmd: 'STOP' | 'STEP' | 'PLAY', step?: number) {
    	if(cmd == "STEP") {
	        await this.qlc.setQlcValue(`${cueId}|STEP|${step}`)
	    } else {
            await this.qlc.setQlcValue(`${cueId}|${cmd}`);
        }
    }

    public async getCues() {
        const cues: {id: number, name: string}[] = [];
        const widgets = await this.getWidgetsList();

        for(const widget of widgets) {
            const type = await this.getWidgetType(widget.id);

            if(type == "Cue-Liste") {
                cues.push(widget);
            }
        }

        return cues;
    }

    public async getWidgetsList() {
        const data = await this.qlc.getQlcValue("getWidgetsList");
        const widgets: {id: number, name: string}[] = [];

        for(let i=0; i<data.length; i+= 2) {
            widgets.push({id: Number(data[i]), name: data[i+1]})
        }

        return widgets;
    }

    public async getWidgetType(id: number) {
        const data = await this.qlc.getQlcValue("getWidgetType", `|${id}`);
        return data[0];
    }
}
