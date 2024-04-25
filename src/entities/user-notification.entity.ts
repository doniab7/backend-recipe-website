import { Column, ManyToOne, ChildEntity } from 'typeorm';
import { Notification, NotificationType } from './notification.entity';
import { User } from './user.entity';

@ChildEntity()
export class UserNotification extends Notification {
  @ManyToOne(() => User, { eager: true })
  sender: User;

  @Column()
  content: string;

  constructor() {
    super();
    this.type = NotificationType.SUBSCRIBED_USER;
  }
}
