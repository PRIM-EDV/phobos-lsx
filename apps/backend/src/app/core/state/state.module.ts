import { Global, Module } from '@nestjs/common';
import { StateService } from './state.service';

@Global()
@Module({
    exports: [
        StateService
    ],
    providers: [
        StateService
    ]
})

export class StateModule {}
