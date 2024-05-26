import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Ingredient } from './ingredient.entity';
import { Step } from './step.entity';
import { User } from './user.entity';
import { Comment } from './comment.entity';
import { Category } from './category.entity';

@Entity()
export class Meal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('int')
  duration: number;

  @Column('int')
  numberLikes: number;

  @Column('text')
  description: string;

  @Column('text')
  region: string;

  @Column('text')
  thumbnail: string;

  @ManyToOne(() => Category, (category) => category.meals)
  category: Category;

  @OneToMany(() => Ingredient, (ingredient) => ingredient.meal)
  ingredients: Ingredient[];

  @OneToMany(() => Step, (step) => step.meal)
  steps: Step[];

  @ManyToOne(() => User, (user) => user.meals, { onDelete: 'CASCADE' })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.meal)
  comments: Comment[];

  @ManyToMany(() => User, (user) => user.likedMeals)
  @JoinTable()
  usersWhoLiked: User[];

  @ManyToMany(() => User, (user) => user.bookmarkedMeals)
  usersWhoBookmarked: User[];
}
