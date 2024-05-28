import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
  UnauthorizedException,
  Patch,
  BadRequestException,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserSubscribeDto } from './dto/user-subscription';
import { LoginCredentialsDto } from './dto/login-user';
import { User } from './user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from './Guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CustomFileInterceptor } from 'src/interceptor/fileInterceptor.interceptor';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@User() user) {
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('followers')
  async getFollowers(@User() user) {
    return this.userService.getFollowers(user.id);
  }
  @UseGuards(JwtAuthGuard)
  @Get('followings')
  async getFollowings(@User() user) {
    return this.userService.getFollowings(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('connected')
  getUserConnected(@User() user) {
    return user;
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
    if (!dbuser) {
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
    console.log(updateuser);
    this.userService.update(user.id, updateuser);

    return { fileName };
  }
  @UseGuards(JwtAuthGuard)
  @Post('follow')
  async follow(@User() user: any, @Body('idWanted') idWanted: string) {
    try {
      await this.userService.followUser(user.id, idWanted);
      return { result: 'ok' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
}
