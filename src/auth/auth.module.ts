import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Bookmark } from './entities/bookmark.entity';
import { User } from './entities/user.entity';
import { JwtStratgey } from './strategy';
import 'dotenv/config';
@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([User, Bookmark]),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '15m' },
    }),
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStratgey],
})
export class AuthModule {}
