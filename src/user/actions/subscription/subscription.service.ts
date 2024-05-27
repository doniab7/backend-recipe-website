import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../entities/user.entity';
import { Category } from '../../../entities/category.entity';
import { NotificationService } from "../../../notification/notification.service";

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    //private readonly notificationService: NotificationService
  ) {}

  async subscribe(userId: string, targetId: string): Promise<string> {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['subscriptions', 'subscribedCategories'] });
    if (!user) throw new NotFoundException('User not found');

    const category = await this.categoryRepository.findOne({ where: { id: targetId }});
    if (category) {
      if (user.subscribedCategories.find((subscribedCategory) => subscribedCategory.id === category.id)) {
        return 'Already subscribed to this category';
      }
      user.subscribedCategories.push(category);
      await this.userRepository.save(user);
      return `Subscribed to category ${category.name}`;
    }

    const targetUser = await this.userRepository.findOne({ where: { id: targetId }});
    if (targetUser) {
      if (user.subscriptions.find((subscription) => subscription.id === targetUser.id)) {
        return 'Already subscribed to this user';
      }
      user.subscriptions.push(targetUser);
      await this.userRepository.save(user);
      //save notification
      /*const content = `You got a subscription from ${user.username}`;
      this.notificationService.createUserNotification(targetId,userId,content)
      */
      return `Subscribed to user ${targetUser.username}`;

    }

    throw new NotFoundException('Target not found');
  }

  async unsubscribe(userId: string, targetId: string): Promise<string> {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['subscriptions', 'subscribedCategories'] });
    if (!user) throw new NotFoundException('User not found');

    const category = await this.categoryRepository.findOne({ where: { id: targetId }});
    if (category) {
      user.subscribedCategories = user.subscribedCategories.filter(subscribedCategory => subscribedCategory.id !== category.id);
      await this.userRepository.save(user);
      return `Unsubscribed from category ${category.name}`;
    }

    const targetUser = await this.userRepository.findOne({ where: { id: targetId }});
    if (targetUser) {
      user.subscriptions = user.subscriptions.filter(subscription => subscription.id !== targetUser.id);
      await this.userRepository.save(user);
      return `Unsubscribed from user ${targetUser.username}`;
    }

    throw new NotFoundException('Target not found');
  }

  async findAll(userId: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['subscriptions', 'subscribedCategories'] });
    if (!user) throw new NotFoundException('User not found');

    return {
      subscriptions: user.subscriptions,
      subscribedCategories: user.subscribedCategories,
    };
  }

  async findOne(userId: string, targetId: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['subscriptions', 'subscribedCategories'] });
    if (!user) throw new NotFoundException('User not found');

    const category = user.subscribedCategories.find(subscribedCategory => subscribedCategory.id === targetId);
    if (category) return category;

    const targetUser = user.subscriptions.find(subscription => subscription.id === targetId);
    if (targetUser) return targetUser;

    throw new NotFoundException('Subscription not found');
  }
}