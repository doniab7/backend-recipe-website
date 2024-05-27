import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../Guards/jwt-auth.guard';
import { User } from '../../user.decorator';
import { BookmarkService } from './bookmark.service';
import { UserService } from 'src/user/user.service';

@Controller('bookmark')
export class BookmarkController {
  constructor(
    private readonly bookmarkService: BookmarkService,
    private readonly userService: UserService,
  ) {}

  // id is meal id
  @UseGuards(JwtAuthGuard)
  @Post(':id')
  async bookmarkMeal(@Param('id') id: string, @User() user) {
    return this.bookmarkService.bookmarkMeal(user.id, id);
  }

  // id is user id
  @UseGuards(JwtAuthGuard)
  @Get()
  async getBookmarks(@User() user) {
    return this.bookmarkService.getBookmarks(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('isbookmarked/:mealId')
  async getIsBookmarked(@Param('mealId') mealId: string, @User() user) {
    return this.bookmarkService.getIsBookmarked(mealId, user.id);
  }

  // id is meal id
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async removeBookmark(@Param('id') id: string, @User() user) {
    return this.bookmarkService.removeBookmark(user.id, id);
  }
}
