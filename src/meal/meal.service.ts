import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from '../common/service/crud.service';
import { Meal } from '../entities/meal.entity';
import { DeepPartial, Repository } from 'typeorm';
import { Ingredient } from 'src/entities/ingredient.entity';
import { Step } from 'src/entities/step.entity';

@Injectable()
export class MealService extends CrudService<Meal> {
  constructor(
    @InjectRepository(Meal)
    private mealRepository: Repository<Meal>,
    @InjectRepository(Ingredient)
    private ingredientRepository: Repository<Ingredient>,
    @InjectRepository(Step)
    private stepRepository: Repository<Step>,
  ) {
    super(mealRepository);
  }

  async create(entity: DeepPartial<Meal>): Promise<Meal> {
    await this.ingredientRepository.save(entity.ingredients);
    await this.stepRepository.save(entity.steps);
    return this.mealRepository.save(entity);
  }

  findOne(id): Promise<Meal> {
    return this.mealRepository
      .createQueryBuilder('meal')
      .leftJoinAndSelect('meal.category', 'category')
      .leftJoinAndSelect('meal.ingredients', 'ingredient')
      .leftJoinAndSelect('meal.steps', 'step')
      .where('meal.id = :id', { id })
      .getOne();
  }
}