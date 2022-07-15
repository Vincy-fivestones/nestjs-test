import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async editUser(userId: number, dto: EditUserDto) {
    const user = await this.userRepository.save({
      id: userId,
      ...dto,
    });

    delete user.hash;

    return user;
  }
}
