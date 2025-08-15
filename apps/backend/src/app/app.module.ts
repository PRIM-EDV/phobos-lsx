import { Global, Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './api/auth/auth.module';
import { AnnouncementsModule } from './api/announcements/announcements.module';
import { LockdownModule } from './api/lockdown/lockdown.module';
import { FluffModule } from './api/fluff/fluff.module';
import { DroneModule } from './api/drone/drone.module';
import { AppGateway } from './app.gateway';
import { LightModule } from './core/light/light.module';
import { LoggingModule } from './core/logging/logging.module';
import { StateModule } from './core/state/state.module';
import { QlcModule } from './platform/qlc/qlc.module';
import { ApiModule } from './api/api.module';
import { SoundModule } from './core/sound/sound.module';
import { AudioService } from './platform/audio/audio.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { DeviceModule } from './core/device/device.module';

@Global()
@Module({
  imports: [
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    EventEmitterModule.forRoot(),
    ApiModule,
    AnnouncementsModule,
    StateModule,
    LoggingModule,
    LockdownModule,
    FluffModule,
    SoundModule,
    DroneModule,
    QlcModule,
    LightModule,
    DeviceModule
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway, AudioService],
  exports: [AppGateway, AudioService]
})
export class AppModule {}
