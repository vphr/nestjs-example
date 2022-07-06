import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { Currentuser } from './decorators/current-user.decorators';
import { CreateUserDto } from './dtos/create-users.dto';
import { UpdateUserDto } from './dtos/update-users.dto';
import { UserDto } from './dtos/user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Serialize(UserDto)
@Controller('auth')
export class UsersController {
  constructor(
    private serviceUsers: UsersService,
    private serviceAuth: AuthService,
  ) {}

  @Post('/signout')
  signOut(@Session() session: any) {
    session.userId = null;
  }
  @Get('/whoami')
  @UseGuards(AuthGuard)
  whoAmI(@Currentuser() user: User) {
    return user;
  }
  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.serviceAuth.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }
  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.serviceAuth.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.serviceUsers.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }
  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.serviceUsers.find(email);
  }
  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body('body') body: UpdateUserDto) {
    return this.serviceUsers.update(parseInt(id), body);
  }
  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.serviceUsers.remove(parseInt(id));
  }
}
