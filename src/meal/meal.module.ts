import { Module } from '@nestjs/common';
import { MealService } from './meal.service';
import { MealController } from './meal.controller';
import { Meal } from '../entities/meal.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingredient } from 'src/entities/ingredient.entity';
import { Step } from 'src/entities/step.entity';
import { User } from 'src/entities/user.entity';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([Meal, Ingredient, Step, User]),
    MulterModule.register({
      dest: 'public/uploads/meal',
    }),
  ],
  controllers: [MealController],
  providers: [MealService],
})
export class MealModule {}
