import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Meal } from './meal.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @ManyToOne(() => Meal, (meal) => meal.comments)
  meal: Meal;

  @Column()
  content: string;

  @Column('bigint')
  timestamp: number;
}
