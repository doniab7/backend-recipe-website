import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../entities/user.entity';
import { Meal } from 'src/entities/meal.entity';
import { Comment } from 'src/entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Meal)
    private mealRepository: Repository<Meal>,
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  async addComment(userId: string, mealId: string, content: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.comments', 'comments')
      .where('user.id = :id', { id: userId })
      .getOne();

    const meal = await this.mealRepository
      .createQueryBuilder('meal')
      .leftJoinAndSelect('meal.comments', 'comments')
      .where('meal.id = :id', { id: mealId })
      .getOne();

    if (!user || !meal) {
      throw new NotFoundException('User or Meal not found');
    }

    const comment = new Comment();
    comment.content = content;
    comment.user = user;
    comment.meal = meal;
    comment.timestamp = Date.now();

    await this.commentRepository.save(comment);
    return { message: 'Comment successfully added', comment: comment };
  }

  async removeComment(userId: string, commentId: string) {
    const comment = await this.commentRepository
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.user', 'user')
      .where('comment.id = :id', { id: commentId })
      .getOne();
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    if (comment.user.id !== userId) {
      throw new UnauthorizedException(
        'User not allowed to delete this comment',
      );
    }
    await this.commentRepository.delete(commentId);
    return { message: 'Comment removed successfully' };
  }

  async getCommentsOfMeal(mealId: string) {
    const meal = await this.mealRepository
      .createQueryBuilder('meal')
      .leftJoinAndSelect('meal.comments', 'comments')
      .leftJoinAndSelect('comments.user', 'user')
      .where('meal.id = :id', { id: mealId })
      .orderBy('comments.timestamp', 'DESC') // 'DESC' for descending order, 'ASC' for ascending
      .getOne();

    if (!meal) {
      throw new NotFoundException('Meal not found');
    }

    return meal.comments;
  }
}
