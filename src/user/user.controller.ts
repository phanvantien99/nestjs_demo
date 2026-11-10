import { Body, Controller, Delete, Get, Param, Post, Put, Query  } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto.js';
import { UpdateUserDTO } from './dto/update-user.dto.js';
import { UserService } from './user.service.js';
import type { UserResponse } from './user.service.js';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @Get("all")
  getUsers(@Query('name') name: string) : any[] {
    return this.userService.findAllUsers(name);
  }

  @Get('ab/:id')
  getUserById(@Param('id') id: string)  {
    return this.userService.findUserById(Number(id));
  }

  @Post()
  createUser(@Body() payload: CreateUserDTO) {
    return this.userService.createUser(payload);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() payload: UpdateUserDTO) : UserResponse {
    return this.userService.updateUser(Number(id), payload);
  }
  
  @Delete(':id')
  deleteUser(@Param('id') id: string) : UserResponse {
    return this.userService.deleteUser(Number(id));
  }
}
