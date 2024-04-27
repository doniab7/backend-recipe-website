import { Module } from '@nestjs/common';
import { MealService } from './meal.service';
import { MealController } from './meal.controller';
import { Meal } from '../entities/meal.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingredient } from 'src/entities/ingredient.entity';
import { Step } from 'src/entities/step.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Meal, Ingredient, Step])],
  controllers: [MealController],
  providers: [MealService],
})
export class MealModule {}
