import { Module } from '@nestjs/common';
import { MealService } from './meal.service';
import { MealController } from './meal.controller';
import { Meal } from '../entities/meal.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Meal])],
  controllers: [MealController],
  providers: [MealService],
})
export class MealModule {}
