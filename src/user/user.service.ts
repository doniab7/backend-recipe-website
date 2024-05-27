import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserSubscribeDto } from './dto/user-subscription';
import { CrudService } from '../common/service/crud.service';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginCredentialsDto } from './dto/login-user';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService extends CrudService<User> {
  // Injecter le repository de l'entite User dans le constructeur
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {
    super(userRepository);
  }
  async passwordHash(user: User | UpdateUserDto) {
    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, user.salt);
    return user;
  }
  async register(userData: UserSubscribeDto) {
    const existingUser = await this.userRepository.findOneBy({
      email: userData.email,
    });
    if (existingUser) {
      throw new ConflictException('Cet e-mail est déjà utilisé');
    }
    const user = this.userRepository.create({
      ...userData,
    });

    user.ImageProfile = '';
    user.bookmarkedMeals = [];
    await this.passwordHash(user);
    try {
      await this.userRepository.save(user);

      const payload = {
        sub: user.id,
        username: user.username,
        email: user.email,
      };
      const jwt = await this.jwtService.sign(payload);
      return {
        access_token: jwt,
      };
    } catch (error) {
      throw new HttpException(
        'Error during registration',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async login(credentials: LoginCredentialsDto) {
    const { email, password } = credentials;
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', {
        email,
      })
      .getOne();
    if (!user) throw new NotFoundException('Compte inexistant');
    const hashedPassword = await bcrypt.hash(password, user.salt);
    if (hashedPassword === user.password) {
      const payload = {
        sub: user.id,
        username: user.username,
        email: user.email,
      };
      const jwt = await this.jwtService.sign(payload);
      return {
        access_token: jwt,
      };
    } else {
      throw new NotFoundException('password erroné');
    }
  }

  async findByEmail(email: string) {
    return this.userRepository.findOneBy({ email: email });
  }

  async findByUsername(username: string) {
    return this.userRepository.findOneBy({ username: username });
  }
  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (updateUserDto.password) {
      // Assume you have a method passwordHash to hash the password
      await this.passwordHash(updateUserDto);
    }

    const updatedUser: UpdateResult = await this.userRepository.update(
      id,
      updateUserDto,
    );

    if (updatedUser.affected === 1) {
      return await this.findOne(id);
    } else {
      throw new Error('Failed to update user');
    }
  }
}
