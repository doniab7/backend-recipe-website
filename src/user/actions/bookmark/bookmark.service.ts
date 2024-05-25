import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../entities/user.entity';
import { Meal } from 'src/entities/meal.entity';

@Injectable()
export class BookmarkService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Meal)
    private mealRepository: Repository<Meal>,
  ) {}

  async bookmarkMeal(id: string, mealId: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.bookmarkedMeals', 'bookmarkedMeals')
      .where('user.id = :id', { id: id })
      .getOne();

    if (!user) {
      throw new Error('User not found');
    }
    const meal = await this.mealRepository
      .createQueryBuilder('meal')
      .leftJoinAndSelect('meal.usersWhoBookmarked', 'usersWhoBookmarked')
      .where('meal.id = :id', { id: mealId })
      .getOne();

    if (!meal) {
      throw new Error('Meal not found');
    }
    if (user.bookmarkedMeals.includes(meal)) {
      throw new Error('Meal already bookmarked');
    }
    user.bookmarkedMeals.push(meal);
    await this.userRepository.save(user);
    return user;
  }

  async getBookmarks(id: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.bookmarkedMeals', 'bookmarkedMeals')
      .where('user.id = :id', { id: id })
      .getOne();

    return user.bookmarkedMeals;
  }
}
