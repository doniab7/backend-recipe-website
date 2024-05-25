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
import { UserModule } from './user/user.module';
import { GraphqlModule } from './grapgql/graphql.module';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { MealModule } from './meal/meal.module';
import { CategoryModule } from './category/category.module';
import { BookmarkModule } from './user/actions/bookmark/bookmark.module';
import { CommentModule } from './user/actions/comment/comment.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
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
      logging: true,
    }),
    UserModule,
    GraphqlModule,
    MealModule,
    CategoryModule,
    BookmarkModule,
    CommentModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
