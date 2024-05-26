import { Injectable } from '@nestjs/common';
import { User } from '../../../entities/user.entity';
import { Meal } from '../../../entities/meal.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Meal)
    private mealRepository: Repository<Meal>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async likeMeal(userId: string, mealId: string): Promise<void> {
    const meal = await this.mealRepository.findOne({ where: { id: mealId }, relations: ['usersWhoLiked'] });
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (meal && user) {
      meal.usersWhoLiked.push(user);
      meal.numberLikes++;
      await this.mealRepository.save(meal);
    }
  }

  async unlikeMeal(userId: string, mealId: string): Promise<void> {
    const meal = await this.mealRepository.findOne({ where: { id: mealId }, relations: ['usersWhoLiked'] });
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (meal && user) {
      meal.usersWhoLiked = meal.usersWhoLiked.filter(u => u.id !== userId);
      meal.numberLikes--;
      await this.mealRepository.save(meal);
    }
  }
}

