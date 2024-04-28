import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Meal } from './meal.entity';

export enum IngredientType {
  KG = 'kg',
  ML = 'ml',
  PIECE = 'piece',
  SPOON = 'spoon',
  TO_SERVE = 'toServe',
}

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  type: IngredientType;

  @Column()
  quantity: number;

  @ManyToOne(() => Meal, (meal) => meal.ingredients, { onDelete: 'CASCADE' })
  meal: Meal;
}
