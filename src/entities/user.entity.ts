import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Meal } from './meal.entity';
import { Notification } from './notification.entity';
import { Comment } from './comment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Meal, (meal) => meal.user)
  meals: Meal[];

  @OneToMany(() => Notification, (notification) => notification.sender)
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
}
