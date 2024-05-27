import { Ingredient } from "../../entities/ingredient.entity";
import { Step } from "../../entities/step.entity";

export class CreateMealDto {
  
    name: string;

    duration: number;
 
    description: string;
  
    region: string;

    ingredients: Ingredient[];
  
    steps: Step[];  
}
