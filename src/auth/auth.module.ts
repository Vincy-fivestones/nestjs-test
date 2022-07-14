import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Bookmark } from './entities/bookmark.entity';
import { User } from './entities/user.entity';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([User, Bookmark]),
    JwtModule.register({}),
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
