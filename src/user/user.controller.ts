import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { GetUser } from 'src/auth/decorator';
import { User } from 'src/auth/entities/user.entity';
import { JwtGuard } from 'src/auth/guards';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

// use for golbal level
@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  // Now this endpoint is required to add header Authorization with the jwt token

  //   @Get('me')
  //   @UseGuards(AuthGuard('jwt')) // keyword match to jwt.strategy
  //   getMe(@Req() req: Request) {
  //     return 'user info';
  //   }

  // using custom guards
  //   @Get('me')
  //   @UseGuards(JwtGuard) // keyword match to jwt.strategy
  //   getMe(@Req() req: Request) {
  //     return 'user info';
  //   }

  // use custom decorator
  @Get('me')
  //@UseGuards(JwtGuard) // keyword match to jwt.strategy
  getMe(@GetUser() user: User) {
    return user;
  }

  @Get('meId')
  getMeId(@GetUser('id') userId: number) {
    return userId;
  }
  @Get('meEmail')
  getMeEmail(@GetUser('email') email: string) {
    return email;
  }
  // edit user info
  @Patch()
  editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
    return this.userService.editUser(userId, dto);
  }
}
