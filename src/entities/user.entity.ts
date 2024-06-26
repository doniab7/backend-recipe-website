import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { Exclude } from '@nestjs/class-transformer';

import { Meal } from './meal.entity';
import { Notification } from './notification.entity';
import { Comment } from './comment.entity';
import { Category } from './category.entity';
import { Timestamp } from 'src/common/entities/timestamp.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class User extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  username: string;

  @Column()
  @Field(() => String)
  email: string;
  @Column({ default: '' })
  @Field(() => String)
  bio: string;
  @Column()
  password: string;
  @Column({ default: '' })
  @Field(() => String)
  ImageProfile: string;
  @Column()
  @Exclude()
  salt: string;
  @OneToMany(() => Meal, (meal) => meal.user)
  meals: Meal[];

  @OneToMany(() => Notification, (notification) => notification.notifiedUser)
  notifications: Notification[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @ManyToMany(() => Meal)
  @JoinTable({
    name: 'user_likes',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'meal_id', referencedColumnName: 'id' },
  })
  likedMeals: Meal[];

  @ManyToMany(() => Meal)
  @JoinTable({
    name: 'user_bookmarks',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'meal_id', referencedColumnName: 'id' },
  })
  bookmarkedMeals: Meal[];

  @ManyToMany(() => User, (user) => user.followers)
  @JoinTable({
    name: 'user_follows',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'follower_id', referencedColumnName: 'id' },
  })
  following: User[];

  @ManyToMany(() => User, (user) => user.following)
  followers: User[];

  @ManyToMany(() => User, (user) => user.subscribers)
  @JoinTable({
    name: 'user_subscribers',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'subscriber_id', referencedColumnName: 'id' },
  })
  subscriptions: User[];

  @ManyToMany(() => User, (user) => user.subscriptions)
  subscribers: User[];

  @ManyToMany(() => Category, (category) => category.subscribedUsers)
  @JoinTable({
    name: 'user_subscribed_categories',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'category_id', referencedColumnName: 'id' },
  })
  subscribedCategories: Category[];
}
