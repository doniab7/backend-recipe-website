import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Meal } from './meal.entity';

@Entity()
export class Step {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  rank: number;

  @Column()
  description: string;

  @ManyToOne(() => Meal, (meal) => meal.steps)
  meal: Meal;
}
