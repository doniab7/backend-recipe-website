import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from '../common/service/crud.service';
import { Meal } from '../entities/meal.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MealService extends CrudService<Meal> {
  constructor(
    @InjectRepository(Meal)
    mealRepository: Repository<Meal>,
  ) {
    super(mealRepository);
  }
// others methods than the CRUD methods

}
