import { Injectable } from '@nestjs/common';

interface User {
    id: number;
    name: string;
    email: string;
}

@Injectable()
export class UserService {
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

  findAllUsers(name: string = '') {
    return this._user.filter((user) =>
      user.name.toLowerCase().includes(name.toLowerCase()),
    );
  }
}
