// import { Request, Response } from 'express';
import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './user.service';
import { UserDTO } from './user-dto/user-dto';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  //  User Registration route
  @Post('register')
  async registerUser(@Body() Dto: UserDTO) {
    return this.usersService.registerUser(Dto);
  }
}
