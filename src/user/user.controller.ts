import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserSubscribeDto } from './dto/user-subscription';
import { LoginCredentialsDto } from './dto/login-user';
import { FileInterceptor } from '@nestjs/platform-express';
import { CustomFileInterceptor } from 'src/interceptor/fileInterceptor.interceptor';
import { User } from './user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Post('register')
  register(@Body() userData: UserSubscribeDto) {
    return this.userService.register(userData);
  }
  @Get('email/:email')
  async findByEmail(@Param() params) {
    return this.userService.findByEmail(params.email);
  }

  @Get('username/:username')
  async findByUsername(@Param() params) {
    return this.userService.findByUsername(params.username);
  }

  @Post('login')
  login(@Body() credentials: LoginCredentialsDto) {
    return this.userService.login(credentials);
  }
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.remove(id);
  }
  @Post('profile/photo')
  @UseInterceptors(
    FileInterceptor('photo'),
    new CustomFileInterceptor(['image/png', 'image/jpeg'], 1000000),
  )
  async uploadProfilePhoto(
    @UploadedFile() file: Express.Multer.File,
    @User() user,
  ) {
    const fileName = await this.userService.uploadFile(file, 'user');
    const updateuser = new UpdateUserDto();
    updateuser.ImageProfile = fileName;
    this.userService.update(user.email, updateuser);

    return { fileName };
  }
}
