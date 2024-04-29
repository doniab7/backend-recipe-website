import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from 'src/entities/user.entity';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async findAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }
  @Query(() => User)
  async findUserById(@Args('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }
  @Query(() => User)
  async findUserByEmail(@Args('email') email: string): Promise<User> {
    return this.userService.findByEmail(email);
  }
  @Query(() => User)
  async findUserByUsername(@Args('username') username: string): Promise<User> {
    return this.userService.findByUsername(username);
  }
}
