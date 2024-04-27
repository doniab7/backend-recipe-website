import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EntityManager } from 'typeorm';
import { seedCategories } from './category/category.seeder';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  //seeding categories
  const entityManager = app.get(EntityManager);
  await seedCategories(entityManager);

  await app.listen(3000);
}
bootstrap();
