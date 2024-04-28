import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserSubscribeDto } from './dto/user-subscription';
import { LoginCredentialsDto } from './dto/login-user';
import { FileInterceptor } from '@nestjs/platform-express';


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

  @Post()
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
  @UseInterceptors(FileInterceptor('photo'))
  async uploadProfilePhoto(@UploadedFile() file: Express.Multer.File) {
    const fileName = await this.userService.uploadFile(file, 'user');
    return { fileName };
  }
 
}
