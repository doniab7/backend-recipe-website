import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/passport-jwt.strategy';
import { MulterModule } from '@nestjs/platform-express';
import { UserResolver } from './user.resolver';
import { Meal } from 'src/entities/meal.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Meal]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: 'BennAppetit',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    MulterModule.register({
      dest: 'public/uploads/user',
    }),
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy, UserResolver],
})
export class UserModule {}
