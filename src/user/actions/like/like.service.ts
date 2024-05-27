import { Injectable } from '@nestjs/common';
import { User } from '../../../entities/user.entity';
import { Meal } from '../../../entities/meal.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationService } from "../../../notification/notification.service";


@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Meal)
    private mealRepository: Repository<Meal>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    //private readonly notificationService: NotificationService,
  ) {}

  async likeMeal(userId: string, mealId: string): Promise<void> {
    const meal = await this.mealRepository.findOne({ where: { id: mealId }, relations: ['usersWhoLiked'] });
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (meal && user) {
      meal.usersWhoLiked.push(user);
      meal.numberLikes++;
      await this.mealRepository.save(meal);
      /*
      const content = `${user.username} liked your meal ${meal.name}`;
      this.notificationService.createCategoryNotification(meal.user.id, meal.category.id, content)
      */
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

