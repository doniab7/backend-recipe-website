import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Meal } from './meal.entity';

export enum CategoryName {}
// Define the category names as per your application's needs.

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: CategoryName,
  })
  name: CategoryName;

  @OneToMany(() => Meal, (meal) => meal.category)
  meals: Meal[];
}
