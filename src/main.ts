import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const logger = new Logger('NestApplication', true);
  const port = process.env.PORT || 3000;

  app.enableCors();
  app.setGlobalPrefix('lightzane');
  app.useStaticAssets('public');

  await app.listen(port);
  logger.warn(`Application running on ${await app.getUrl()}`);
}
bootstrap();
