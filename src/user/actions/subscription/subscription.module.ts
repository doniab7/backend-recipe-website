import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { User } from '../../../entities/user.entity';
import { Category } from '../../../entities/category.entity';
import { NotificationService } from "../../../notification/notification.service";


@Module({
  imports: [
    TypeOrmModule.forFeature([User, Category]),
  ],
  providers: [SubscriptionService],
  controllers: [SubscriptionController],
})
export class SubscriptionModule {}
