import { Global, Module } from "@nestjs/common";
import { DeviceService } from "./device.service";

@Global()
@Module({
    imports: [],
    controllers: [],
    providers: [DeviceService],
    exports: [DeviceService]
})
export class DeviceModule {
    constructor() {
    }
}