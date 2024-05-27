import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meal } from '../../../entities/meal.entity';
import { User } from '../../../entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Meal, User])],
  providers: [LikeService],
  controllers: [LikeController],
})
export class LikeModule {}
