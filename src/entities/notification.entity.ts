import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  TableInheritance,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';

export enum NotificationType {
  COMMENT = 'comment',
  FOLLOW = 'follow',
  LIKE = 'like',
  SUBSCRIBED_USER = 'subscribedUser',
  SUBSCRIBED_CATEGORY = 'subscribedCategory',
}

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: NotificationType,
  })
  type: NotificationType;

  @Column('bigint')
  timestamp: number;

  @ManyToOne(() => User)
  notifiedUser: User;
}
