import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserNotification } from './entities/user-notification.entity';
import { User } from './entities/user.entity';
import { Meal } from './entities/meal.entity';
import { Category } from './entities/category.entity';
import { CategoryNotification } from './entities/category-notification.entity';
import { Ingredient } from './entities/ingredient.entity';
import { Step } from './entities/step.entity';
import { Comment } from './entities/comment.entity';
import { Notification } from './entities/notification.entity';
import { MealModule } from './meal/meal.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'sql123',
      database: 'recipe',
      entities: [
        User,
        Meal,
        Notification,
        Comment,
        Category,
        UserNotification,
        CategoryNotification,
        Ingredient,
        Step,
      ],
      synchronize: true,
    }),
    MealModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
