import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { EntityManager } from 'typeorm';
import { seedCategories } from './category/category.seeder';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets('public/uploads/user');
  app.useStaticAssets('public/uploads/recipe');
  app.enableCors();

  //seeding categories
  const entityManager = app.get(EntityManager);
  await seedCategories(entityManager);

  await app.listen(3000);
}
bootstrap();
