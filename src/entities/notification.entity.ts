import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum NotificationType {
  COMMENT = 'comment',
  FOLLOW = 'follow',
  LIKE = 'like',
  SUBSCRIBED_USER = 'subscribedUser',
  SUBSCRIBED_CATEGORY = 'subscribedCategory',
}

@Entity()
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
  sender: any;
}
