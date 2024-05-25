import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UnauthorizedException,
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

  @UseGuards(JwtAuthGuard)
  @Post(':id')
  async bookmarkMeal(@Param('id') id: string, @User() user) {
    return this.bookmarkService.bookmarkMeal(user.id, id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getBookmarks(@Param('id') id: string, @User() user) {
    const dbuser = await this.userService.findOne(id);
    if (!dbuser) {
      throw new NotFoundException('User not found');
    }
    if (dbuser.id !== user.id) {
      throw new UnauthorizedException(
        'Unauthorized: User does not have permission to view bookmarks',
      );
    }
    return this.bookmarkService.getBookmarks(id);
  }
}
