import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../entities/user.entity';
import { Meal } from 'src/entities/meal.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Meal)
    private mealRepository: Repository<Meal>,
  ) {}

  async likeMeal(id: string, mealId: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.likedMeals', 'likedMeals')
      .where('user.id = :id', { id: id })
      .getOne();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const meal = await this.mealRepository
      .createQueryBuilder('meal')
      .leftJoinAndSelect('meal.usersWhoLiked', 'usersWhoLiked')
      .where('meal.id = :id', { id: mealId })
      .getOne();

    if (!meal) {
      throw new NotFoundException('Meal not found');
    }

    if (user.likedMeals.find((likedMeal) => likedMeal.id === meal.id)) {
      return { message: 'Meal already liked' };
    } else {
      user.likedMeals.push(meal);
      meal.numberLikes++;
      await this.userRepository.save(user);
      await this.mealRepository.save(meal);
      return {
        message: 'Meal successfully liked',
        numberLikes: meal.numberLikes,
      };
    }
  }

  async getLikes(id: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.likedMeals', 'likedMeals')
      .where('user.id = :id', { id: id })
      .getOne();

    return user.likedMeals;
  }

  async unlikeMeal(userId: string, mealId: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.likedMeals', 'likedMeals')
      .where('user.id = :id', { id: userId })
      .getOne();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const likeIndex = user.likedMeals.findIndex((meal) => meal.id === mealId);

    if (likeIndex === -1) {
      throw new NotFoundException('Like not found');
    }

    user.likedMeals.splice(likeIndex, 1);
    const meal = await this.mealRepository.findOneBy({ id: mealId });
    meal.numberLikes--;

    await this.userRepository.save(user);
    await this.mealRepository.save(meal);

    return {
      message: 'Like removed successfully',
      numberLikes: meal.numberLikes,
    };
  }

  async getIsLiked(mealId: string, userId: any) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.likedMeals', 'likedMeals')
      .where('user.id = :id', { id: userId })
      .getOne();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const likeIndex = user.likedMeals.findIndex((meal) => meal.id === mealId);

    if (likeIndex === -1) {
      return false;
    } else {
      return true;
    }
  }
}
