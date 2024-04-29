import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MealService } from './meal.service';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';

@Controller('meal')
export class MealController {
  constructor(private readonly mealService: MealService) {}

  @Post('create')
  create(@Body() createMealDto: CreateMealDto) {
    return this.mealService.create(createMealDto);
  }

  @Get()
  findAll() {
    return this.mealService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mealService.findOne(id);
  }

  @Patch('action/:id')
  update(@Param('id') id: string, @Body() updateMealDto: UpdateMealDto) {
    return this.mealService.update(id, updateMealDto);
  }

  @Delete('action/:id')
  remove(@Param('id') id: string) {
    return this.mealService.remove(id);
  }

  @Get('category/:categoryname')
  findByCategory(@Param('categoryname') categoryname: string) {
    return this.mealService.findByCategory(categoryname);
  }

  @Get('user/:userid')
  findByUser(@Param('userid') userid: string) {
    return this.mealService.findByUser(userid);
  }
}
