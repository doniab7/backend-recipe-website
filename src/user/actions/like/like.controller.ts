import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { LikeService } from './like.service';
import { User } from '../../../user/user.decorator';
import { JwtAuthGuard } from 'src/user/Guards/jwt-auth.guard';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':mealId/like')
  async likeMeal(@Param('mealId') mealId: string, @User() user) {
    return this.likeService.likeMeal(user.id, mealId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':mealId/unlike')
  async unlikeMeal(@Param('mealId') mealId: string, @User() user) {
    return this.likeService.unlikeMeal(user.id, mealId);
  }
}
