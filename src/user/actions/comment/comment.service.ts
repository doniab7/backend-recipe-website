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
import { NotificationService } from "../../../notification/notification.service";

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Meal)
    private mealRepository: Repository<Meal>,
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    //private readonly notificationService: NotificationService,
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
    /*
      const content = `${user.username} commented on your meal ${meal.name}`;
      this.notificationService.createCategoryNotification(meal.user.id, meal.category.id, content)
      */
    return { message: 'Comment successfully added' };
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
      .getOne();

    if (!meal) {
      throw new NotFoundException('Meal not found');
    }

    return meal.comments;
  }
}
