import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bookmark } from 'src/auth/entities/bookmark.entity';
import { User } from 'src/auth/entities/user.entity';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Bookmark])],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
