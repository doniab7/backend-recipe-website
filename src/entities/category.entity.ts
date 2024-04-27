import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Meal } from './meal.entity';
import { User } from './user.entity';

export enum CategoryName {
  BEEF = 'Beef',
  CHICKEN = 'Chicken',
  SEAFOOD = 'Seafood',
  VEGETARIAN = 'Vegetarian',
  DESSERT = 'Dessert',
  SALAD = 'Salad',
  PASTA = 'Pasta',
  SOUP = 'Soup',
  APPETIZER = 'Appetizer',
}

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: CategoryName,
  })
  name: CategoryName;

  @Column('text') // path to image of thumbnail
  thumbnail: string;

  @OneToMany(() => Meal, (meal) => meal.category)
  meals: Meal[];

  @ManyToMany(() => User, (user) => user.subscribedCategories)
  @JoinTable({
    name: 'user_subscribed_categories',
    joinColumn: { name: 'category_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  subscribedUsers: User[];
}
