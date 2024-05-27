import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification, NotificationType } from '../entities/notification.entity';
import { User } from '../entities/user.entity';
import { Category } from '../entities/category.entity';
import { CategoryNotification } from '../entities/category-notification.entity';
import { UserNotification } from '../entities/user-notification.entity';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(CategoryNotification)
    private readonly categoryNotificationRepository: Repository<CategoryNotification>,
    @InjectRepository(UserNotification)
    private readonly userNotificationRepository: Repository<UserNotification>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async createUserNotification(userId: string, senderId: string, content: string): Promise<UserNotification> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const sender = await this.userRepository.findOne({ where: { id: senderId } });
    if (!user || !sender) throw new NotFoundException('User not found');

    const notification = this.userNotificationRepository.create({
      content,
      type: NotificationType.SUBSCRIBED_USER,
      timestamp: Date.now(),
      sender,
      notifiedUser: user,
    });

    await this.userNotificationRepository.save(notification);
    pubSub.publish('notificationAdded', { notificationAdded: notification });
    return notification;
  }

  async createCategoryNotification(userId: string, categoryId: string, content: string): Promise<CategoryNotification> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const category = await this.categoryRepository.findOne({ where: { id: categoryId } });
    if (!user || !category) throw new NotFoundException('User or Category not found');

    const notification = this.categoryNotificationRepository.create({
      content,
      type: NotificationType.SUBSCRIBED_CATEGORY,
      timestamp: Date.now(),
      sender: category,
      notifiedUser: user,
    });

    await this.categoryNotificationRepository.save(notification);
    pubSub.publish('notificationAdded', { notificationAdded: notification });
    return notification;
  }
}
