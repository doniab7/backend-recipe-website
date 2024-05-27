import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from '../common/service/crud.service';
import { Meal } from '../entities/meal.entity';
import { DeepPartial, Repository } from 'typeorm';
import { Ingredient } from 'src/entities/ingredient.entity';
import { Step } from 'src/entities/step.entity';
import { User } from 'src/entities/user.entity';
import { SubscriptionService } from "../user/actions/subscription/subscription.service";
import e from "express";

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
    //private readonly notificationService: NotificationService,
  ) {
    super(mealRepository);
  }

  async createMeal(entity: DeepPartial<Meal>, userid): Promise<Meal> {
    const user = await this.userRepository.findOneBy({ id: userid });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    entity.user = user;
    await this.ingredientRepository.save(entity.ingredients);
    await this.stepRepository.save(entity.steps);
    /*
      const categoryID = entity.category.id;
      const content = `a new meal ${entity.name} is added to the ${entity.category.name} `;
      const subscribers = await this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.subscribedCategories', 'category')
        .where('category.id = :categoryId', { categoryID })
        .getMany();
      for (const sub of subscribers) {
        this.notificationService.createCategoryNotification(sub.id, categoryID, content)
      }
      */
    return this.mealRepository.save(entity);
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

  async findByUser(userid: string) {
    return await this.mealRepository
      .createQueryBuilder('meal')
      .leftJoinAndSelect('meal.user', 'user')
      .where('user.id = :userid', { userid })
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
