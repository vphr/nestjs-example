import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-users.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private serviceUsers: UsersService) {}
  @Post('/signup')
  createUser(@Body('body') body: CreateUserDto) {
    this.serviceUsers.create(body.email, body.password);
  }
}
