import { Resolver, Subscription, Mutation, Args, Context } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Notification } from '../entities/notification.entity';
import { CategoryNotification } from '../entities/category-notification.entity';
import { User } from "../entities/user.entity";


@Resolver(() => Notification)
export class NotificationResolver {
  constructor(private readonly pubSub: PubSub) {}

  @Subscription(() => Notification, {
    filter: (payload, variables, context) => {
      return payload.notification.notifiedUser.id === context.req.user.id;
    },
    resolve: (payload) => payload.notificationAdded,
  })
  notification() {
    return this.pubSub.asyncIterator('notificationAdded');
  }
}
