import { Injectable, NotFoundException } from '@nestjs/common';
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
      throw new NotFoundException('User not found');
    }

    const meal = await this.mealRepository
      .createQueryBuilder('meal')
      .leftJoinAndSelect('meal.usersWhoBookmarked', 'usersWhoBookmarked')
      .where('meal.id = :id', { id: mealId })
      .getOne();

    if (!meal) {
      throw new NotFoundException('Meal not found');
    }

    if (
      user.bookmarkedMeals.find(
        (bookmarkedMeal) => bookmarkedMeal.id === meal.id,
      )
    ) {
      return { message: 'Meal already bookmarked' };
    } else {
      user.bookmarkedMeals.push(meal);
      await this.userRepository.save(user);
      return { message: 'Meal successfully bookmarked' };
    }
  }

  async getBookmarks(id: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.bookmarkedMeals', 'bookmarkedMeals')
      .where('user.id = :id', { id: id })
      .getOne();

    return user.bookmarkedMeals;
  }

  async removeBookmark(userId: string, bookmarkId: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.bookmarkedMeals', 'bookmarkedMeals')
      .where('user.id = :id', { id: userId })
      .getOne();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const bookmarkIndex = user.bookmarkedMeals.findIndex(
      (meal) => meal.id === bookmarkId,
    );

    if (bookmarkIndex === -1) {
      throw new NotFoundException('Bookmark not found');
    }

    user.bookmarkedMeals.splice(bookmarkIndex, 1);

    await this.userRepository.save(user);

    return { message: 'Bookmark removed successfully' };
  }

  async getIsBookmarked(mealId: string, userId: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.bookmarkedMeals', 'bookmarkedMeals')
      .where('user.id = :id', { id: userId })
      .getOne();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const bookmarkIndex = user.bookmarkedMeals.findIndex(
      (meal) => meal.id === mealId,
    );

    if (bookmarkIndex === -1) {
      return false;
    } else {
      return true;
    }
  }
}
