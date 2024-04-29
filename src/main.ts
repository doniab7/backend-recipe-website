import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { EntityManager } from 'typeorm';
import { seedCategories } from './category/category.seeder';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets('public/uploads/user');
  app.useStaticAssets('public/uploads/meal');
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.enableCors();

  //seeding categories
  const entityManager = app.get(EntityManager);
  await seedCategories(entityManager);

  await app.listen(3000);
}
bootstrap();
