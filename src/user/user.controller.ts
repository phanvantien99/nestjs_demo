import { Body, Controller, Get, Param, Post, Put, Query  } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto.js';
import { UpdateUserDTO } from './dto/update-user.dto.js';
import { UserService } from './user.service.js';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @Get("all")
  getUsers(@Query('name') name: string) {
    return this.userService.findAllUsers(name);
  }

  @Get('ab/:id')
  getUserById(@Param('name') id: string) {
    return this._USERS.find((obj) => obj.id === id);
  }

  @Post()
  createUser(@Body() payload: CreateUserDTO) {
    return { data: payload, message: 'Create successfully!' };
  }

  @Put(':id')
  updateUser(@Param() id: string, payload: UpdateUserDTO) {
    return { data: { ...payload, id }, message: 'Update successfully!' };
  }
}
