import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config as dotenvConfig } from 'dotenv';
import { Logger } from '@nestjs/common';
import * as config from 'config';

async function bootstrap() {
  dotenvConfig();
  const serverConfig = config.get('server');

  const logger = new Logger('bootstrap');

  const port = process.env.PORT || serverConfig.port;

  const app = await NestFactory.create(AppModule);
  await app.listen(port);

  logger.log(`Listening on port ${port}`);
}

bootstrap();
