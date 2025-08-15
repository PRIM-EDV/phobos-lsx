import { NestApplication, NestFactory } from '@nestjs/core';
import { WsAdapter } from '@nestjs/platform-ws';

import { AppModule } from './app/app.module';
import { RpcModule } from '../lib/rpc/rpc-module';
import { WinstonLogger } from 'src/app/infrastructure/logger/winston/winston.logger';
import { ConfigService } from '@nestjs/config/dist/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule) as NestApplication;
  const rpcModule = new RpcModule();
  const logger = await app.resolve(WinstonLogger);
  const config = app.get<ConfigService>(ConfigService);

  app.enableCors();
  app.useWebSocketAdapter(new WsAdapter(app));
  app.useLogger(logger);

  rpcModule.register(app["container"]);

  await app.listen(4005);
}
bootstrap();
