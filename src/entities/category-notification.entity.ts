// category-notification.entity.ts
import { Column, ManyToOne, ChildEntity } from 'typeorm';
import { Notification, NotificationType } from './notification.entity';
import { Category } from './category.entity';

@ChildEntity()
export class CategoryNotification extends Notification {
  @ManyToOne(() => Category, { eager: true })
  sender: Category;

  @Column()
  content: string;

  constructor() {
    super();
    this.type = NotificationType.SUBSCRIBED_CATEGORY;
  }
}
