import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserSubscribeDto } from './dto/user-subscription';
import { CrudService } from 'src/common/service/crud.service';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginCredentialsDto } from './dto/login-user';

@Injectable()
export class UserService extends CrudService<User> {
  // Injecter le repository de l'entite User dans le constructeur
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {
    super(userRepository);
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
    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, user.salt);
    try {
      await this.userRepository.save(user);
    } catch (e) {
      throw new ConflictException(
        `Le username et le email doivent être unique`,
      );
    }
    return {
      id: user.id,
      username: user.username,
      email: user.email,
    };
  }

  async login(credentials: LoginCredentialsDto) {
    const { username, password } = credentials;
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.username = :username or user.email = :username', {
        username,
      })
      .getOne();
    if (!user) throw new NotFoundException('Compte inexistant');
    const hashedPassword = await bcrypt.hash(password, user.salt);
    if (hashedPassword === user.password) {
      const payload = {
        username: user.username,
        email: user.email,
      };
      const jwt = await this.jwtService.sign(payload);
      return {
        access_token: jwt,
      };
    } else {
      throw new NotFoundException('username ou password erronée');
    }
  }

  async findByEmail(email: string) {
    return this.userRepository.findOneBy({ email: email });
  }

  async findByUsername(username: string) {
    return this.userRepository.findOneBy({ username: username });
  }
  async Update() {}
}
