import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { MealService } from './meal.service';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { User } from 'src/user/user.decorator';

@Controller('meal')
export class MealController {
  constructor(private readonly mealService: MealService) {}

  @Post('create')
  create(@Body() createMealDto: CreateMealDto, @User() user) {
    if (user === undefined) {
      throw new UnauthorizedException('Authentication header is missing');
    }
    return this.mealService.createMeal(createMealDto, user.userid);
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
  async update(
    @Param('id') id: string,
    @User() user,
    @Body() updateMealDto: UpdateMealDto,
  ) {
    const meal = await this.mealService.findOne(id);
    if (!meal) {
      throw new NotFoundException('Meal not found');
    }
    if (user.userid !== meal.user.id) {
      throw new UnauthorizedException(
        'Unauthorized: User does not have permission to update this meal',
      );
    }
    return this.mealService.update(id, updateMealDto);
  }

  @Delete('action/:id')
  async remove(@Param('id') id: string, @User() user) {
    const meal = await this.mealService.findOne(id);
    if (!meal) {
      throw new NotFoundException('Meal not found');
    }
    if (user.userid !== meal.user.id) {
      throw new UnauthorizedException(
        'Unauthorized: User does not have permission to delete this meal',
      );
    }
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
