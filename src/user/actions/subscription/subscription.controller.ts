import { Controller, Get, Post, Delete, Param, UseGuards } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../../../user/user.decorator';

@UseGuards(AuthGuard('jwt'))
@Controller('subscribe')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post(':Id')
  async subscribe(@Param('Id') Id: string, @User() user: any) {
    return this.subscriptionService.subscribe(user.id, Id);
  }

  @Delete(':Id')
  async unsubscribe(@Param('Id') Id: string, @User() user: any) {
    return this.subscriptionService.unsubscribe(user.id, Id);
  }

  @Get()
  async findAll(@User() user: any) {
    return this.subscriptionService.findAll(user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @User() user: any) {
    return this.subscriptionService.findOne(user.id, id);
  }
}
