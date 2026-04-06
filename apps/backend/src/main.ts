import { NestApplication, NestFactory } from '@nestjs/core';
import { WsAdapter } from '@nestjs/platform-ws';

import { WinstonLogger } from '@phobos/infrastructure';

import { AppModule } from './app.module';
import { RpcModule } from '../lib/rpc/rpc-module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule) as NestApplication;
  const rpcModule = new RpcModule();
  const logger = await app.resolve(WinstonLogger);

  app.enableCors();
  app.useWebSocketAdapter(new WsAdapter(app));
  app.useLogger(logger);

  rpcModule.register(app["container"]);

  await app.listen(3005);
}

bootstrap();
