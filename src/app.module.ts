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
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphqlModule } from './grapgql/graphql.module';

require('dotenv').config();

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
    }),
    UserModule,
    GraphqlModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public', 'uploads'), // Spécifiez le chemin vers le répertoire des fichiers statiques
    }),
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
