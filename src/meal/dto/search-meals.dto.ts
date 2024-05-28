import { IsString } from 'class-validator';

export class SearchMealsDto {
  @IsString()
  readonly term: string;

}
