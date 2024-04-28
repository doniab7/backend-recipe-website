import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets('public/uploads/user');
  app.useStaticAssets('public/uploads/recipe');
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
