import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationService } from './notification.service';
import { NotificationResolver } from './notification.resolver';
import { Notification } from '../entities/notification.entity';
import { User } from '../entities/user.entity';
import { Category } from "../entities/category.entity";
import { CategoryNotification } from "../entities/category-notification.entity";
import { UserNotification } from "../entities/user-notification.entity";
import { PubSub } from "graphql-subscriptions";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Notification,
      CategoryNotification,
      UserNotification,
      User,
      Category,
    ]),
  ],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationsModule {}
