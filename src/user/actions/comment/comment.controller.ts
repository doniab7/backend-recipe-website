import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../Guards/jwt-auth.guard';
import { User } from '../../user.decorator';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  // id is meal id
  @UseGuards(JwtAuthGuard)
  @Post(':id')
  async addComment(
    @Param('id') id: string,
    @User() user,
    @Body('comment') comment: string,
  ) {
    return this.commentService.addComment(user.id, id, comment);
  }

  // id is comment id
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async removeComment(@Param('id') id: string, @User() user) {
    return this.commentService.removeComment(user.id, id);
  }
}
