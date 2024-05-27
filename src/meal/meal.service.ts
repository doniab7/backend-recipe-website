import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from '../common/service/crud.service';
import { Meal } from '../entities/meal.entity';
import { DeepPartial, Repository } from 'typeorm';
import { Ingredient } from 'src/entities/ingredient.entity';
import { Step } from 'src/entities/step.entity';
import { User } from 'src/entities/user.entity';

@Injectable()
export class MealService extends CrudService<Meal> {
  constructor(
    @InjectRepository(Meal)
    private mealRepository: Repository<Meal>,
    @InjectRepository(Ingredient)
    private ingredientRepository: Repository<Ingredient>,
    @InjectRepository(Step)
    private stepRepository: Repository<Step>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super(mealRepository);
  }

  async createMeal(entity: DeepPartial<Meal>, userid): Promise<Meal> {
    const user = await this.userRepository.findOneBy({ id: userid });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    entity.user = user;
    const meal = this.mealRepository.create(entity);
    
    const newMeal = await this.mealRepository.save(meal);
    console.log("hello",newMeal);
  //  await this.ingredientRepository.save(entity.ingredients);
   await this.stepRepository.save(entity.steps);
   return newMeal;
   
  }

  async update(id: string, updateDto: DeepPartial<Meal>): Promise<Meal> {
    const entity = await this.mealRepository.preload({
      id,
      ...updateDto,
    });
    if (!entity) {
      throw new NotFoundException('entity Not Found');
    }
    await this.ingredientRepository.save(entity.ingredients);
    await this.stepRepository.save(entity.steps);
    return this.mealRepository.save(entity);
  }

  findOne(id): Promise<Meal> {
    return this.mealRepository
      .createQueryBuilder('meal')
      .leftJoinAndSelect('meal.category', 'category')
      .leftJoinAndSelect('meal.user', 'user')
      .leftJoinAndSelect('meal.ingredients', 'ingredient')
      .leftJoinAndSelect('meal.steps', 'step')
      .where('meal.id = :id', { id })
      .getOne();
  }

  async findByCategory(categoryname: string) {
    return await this.mealRepository
      .createQueryBuilder('meal')
      .leftJoinAndSelect('meal.category', 'category')
      .where('category.name = :categoryname', { categoryname })
      .getMany();
  }

  async findByUser(userId: string) {
    return await this.mealRepository
      .createQueryBuilder('meal')
      .leftJoinAndSelect('meal.user', 'user')
      .leftJoinAndSelect('meal.category', 'category')
      .where('user.id = :userId', { userId })
      .getMany();
  }

  findOneWithLikes(id): Promise<Meal> {
    return this.mealRepository.findOne({
      where: { id },
      relations: {
        usersWhoLiked: true,
      },
    });
  }
}
