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
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { MealService } from './meal.service';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { User } from '../user/user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { CustomFileInterceptor } from '../interceptor/fileInterceptor.interceptor';
import { User as UserEntity } from '../entities/user.entity';
import { JwtAuthGuard } from '../user/Guards/jwt-auth.guard';


@Controller('meal')
export class MealController {
  constructor(private readonly mealService: MealService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  create(@Body() createMealDto: CreateMealDto, @User() user: UserEntity) {
    return this.mealService.createMeal(createMealDto, user.id);
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
    if (user === undefined) {
      throw new UnauthorizedException('Authentication header is missing');
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
    if (user === undefined) {
      throw new UnauthorizedException('Authentication header is missing');
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

  @Post('photo/:id')
  @UseInterceptors(
    FileInterceptor('photo'),
    new CustomFileInterceptor(['image/png', 'image/jpeg'], 1000000),
  )
  async uploadProfilePhoto(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @User() user,
  ) {
    const meal = await this.mealService.findOne(id);
    if (!meal) {
      throw new NotFoundException('Meal not found');
    }
    if (user === undefined) {
      throw new UnauthorizedException('Authentication header is missing');
    }
    if (meal.user.id !== user.userid) {
      throw new UnauthorizedException(
        'Unauthorized: User does not have permission to update this meal',
      );
    }
    const fileName = await this.mealService.uploadFile(file, 'meal');
    meal.thumbnail = fileName;
    this.mealService.update(meal.id, meal);
    return { fileName };
  }
}
