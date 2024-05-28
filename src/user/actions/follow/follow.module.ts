import { Module } from '@nestjs/common';
import { FollowController } from './follow.controller';

@Module({
  controllers: [FollowController],
  providers: [],
})
export class NotificationsModule {}
