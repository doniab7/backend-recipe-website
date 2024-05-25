import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  NotFoundException,
  UnauthorizedException,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserSubscribeDto } from './dto/user-subscription';
import { LoginCredentialsDto } from './dto/login-user';
import { FileInterceptor } from '@nestjs/platform-express';
import { CustomFileInterceptor } from 'src/interceptor/fileInterceptor.interceptor';
import { User } from './user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from './Guards/jwt-auth.guard';

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

  @Get('email/:email')
  async findByEmail(@Param() params) {
    return this.userService.findByEmail(params.email);
  }

  @Get('username/:username')
  async findByUsername(@Param() params) {
    return this.userService.findByUsername(params.username);
  }

  @Post('register')
  register(@Body() userData: UserSubscribeDto) {
    return this.userService.register(userData);
  }

  @Post('login')
  login(@Body() credentials: LoginCredentialsDto) {
    return this.userService.login(credentials);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @User() user,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const dbuser = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (dbuser.id !== user.id) {
      throw new UnauthorizedException(
        'Unauthorized: User does not have permission to update this account info',
      );
    }
    return this.userService.update(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string, @User() user) {
    const dbuser = await this.userService.findOne(id);
    if (!dbuser) {
      throw new NotFoundException('User not found');
    }
    if (dbuser.id !== user.id) {
      throw new UnauthorizedException(
        'Unauthorized: User does not have permission to delete this account',
      );
    }
    return this.userService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
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
    this.userService.update(user.id, updateuser);

    return { fileName };
  }

  @UseGuards(JwtAuthGuard)
  @Post('bookmark/:id')
  async bookmarkMeal(@Param('id') id: string, @User() user) {
    return this.userService.bookmarkMeal(user.id, id);
  }
}
