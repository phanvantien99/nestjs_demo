import { Injectable, NotFoundException } from '@nestjs/common';
import { LogService } from './user.logger.js';
import { CreateUserDTO } from './dto/create-user.dto.js';
import { UpdateUserDTO } from './dto/update-user.dto.js';

export interface User {
    id: number;
    name: string;
    email: string;
}

export interface SuccessResponse<T> {
  data: T;
  message: string;
}

export interface ErrorResponse {
  code: number;
  message: string;
}

export type UserResponse = SuccessResponse<User> | ErrorResponse;

@Injectable()
export class UserService {
  constructor(private readonly logger: LogService) {}

  private _user: User[] = [
    { id: 1, name: 'tien', email: 'tien@example.com' },
    { id: 2, name: 'jhin', email: 'jhin@example.com' },
    { id: 3, name: 'lan', email: 'lan@example.com' },
    { id: 4, name: 'minh', email: 'minh@example.com' },
    { id: 5, name: 'hoa', email: 'hoa@example.com' },
    { id: 6, name: 'nam', email: 'nam@example.com' },
    { id: 7, name: 'linh', email: 'linh@example.com' },
    { id: 8, name: 'khoa', email: 'khoa@example.com' },
  ];

  findUserById(id: number) {
    const user = this._user.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  findAllUsers(name: string = '') {
    this.logger.log(`Finding all users with name: ${name}`);
    return this._user.filter((user) =>
      user.name.toLowerCase().includes(name.toLowerCase()),
    );
  }

  createUser(payload: CreateUserDTO) {
    this.logger.log(`Creating user: ${JSON.stringify(payload)}`);
    this._user.push({
      id: this._user.length + 1,
      name: payload.name,
      email: `${payload.name.toLowerCase()}@example.com`,
    });
    return { data: payload, message: 'Create successfully!' };
  }

  updateUser(id: number, payload: UpdateUserDTO) : UserResponse {
    this.logger.log(`Updating user with id: ${id}, payload: ${JSON.stringify(payload)}`);
    const index = this._user.findIndex((user) => user.id === id);
    if (index !== -1) {
      this._user[index] = { ...this._user[index], ...payload };
      return { data: this._user[index], message: 'Update successfully!' };
    }
    return { code: 400, message: 'User not found!' };
  }

  deleteUser(id: number) : UserResponse {
    this.logger.log(`Deleting user with id: ${id}`);
    const index = this._user.findIndex((user) => user.id === id);
    if (index !== -1) {
      const deletedUser = this._user.splice(index, 1)[0];
      return { data: deletedUser, message: 'Delete successfully!' };
    }
    return { code: 400, message: 'User not found!' };
  }
}
