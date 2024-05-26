import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LikeService } from './like.service';
import { User } from '../../../user/user.decorator';


@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post(':mealId/like')
  async likeMeal(@Param('mealId') mealId: string, @User() user: any) {
    return this.likeService.likeMeal(user.id, mealId);
  }

  @Delete(':mealId/unlike')
  async unlikeMeal(@Param('mealId') mealId: string, @User() user: any) {
    return this.likeService.unlikeMeal(user.id, mealId);
  }
}
