import { PartialType } from '@nestjs/mapped-types';
import { UserSubscribeDto } from './user-subscription';

export class UpdateUserDto extends PartialType(UserSubscribeDto) {}
