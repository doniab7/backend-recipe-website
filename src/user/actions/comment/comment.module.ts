import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../../entities/user.entity';
import { Meal } from 'src/entities/meal.entity';
import { UserModule } from 'src/user/user.module';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { Comment } from 'src/entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Meal, Comment]), UserModule],
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentModule {}
