import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserSubscribeDto } from './dto/user-subscription';
import { LoginCredentialsDto } from './dto/login-user';
import { JwtAuthGuard } from './Guards/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Post()
  register(@Body() userData: UserSubscribeDto) {
    return this.userService.register(userData);
  }
  
  @Post('login')
  login(
    @Body() credentials: LoginCredentialsDto
  ) {
    return this.userService.login(credentials);
  }
  @Delete(':id')
  delete(@Param('id') id: string) {
    console.log(id)
    return this.userService.remove(id);
  }
}
