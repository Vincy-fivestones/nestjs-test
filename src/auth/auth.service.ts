import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { AuthDto } from './dto';
import { User } from './entities/user.entity';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signUp(dto: AuthDto) {
    try {
      // generate the password hash
      const hash = await argon.hash(dto.password);
      // save the new user in the db
      const user = await this.userRepository.create({
        email: dto.email,
        hash: hash,
      });
      // return the saved
      const res = await this.userRepository.save(user);
      delete user.hash; // remove hash in response
      return user;
    } catch (error) {
      return error;
    }
  }

  async signIn(dto: AuthDto) {
    // 1. Find the user

    const user = await this.userRepository.findOne({
      where: {
        email: dto.email,
      },
    });
    // if the user does not exist throw exception
    if (!user) {
      throw new ForbiddenException('Credentials incorrect');
    }

    // 2. Compare the password

    const matchPwd = await argon.verify(user.hash, dto.password);
    // if the password not match throw exception

    if (!matchPwd) {
      throw new ForbiddenException('Credentials incorrect');
    }

    // 3. Send back the user
    // delete user.hash;
    return this.signToken(user.id, user.email); // go to get the JWT token
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ accessToken: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.config.get('JWT_SECRET_KEY');

    //const secret = process.env.JWT_SECRET_KEY;

    // return this.jwt.signAsync(payload, {
    //   expiresIn: '15m', // need to re-login again after 15 mins
    //   secret: secret,
    // });
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m', // need to re-login again after 15 mins
      secret: secret,
    });
    // const token = this.jwt.sign(
    //   { expiresIn: '15m' }, // added days, default for ex 60 would be ms, you can also provide '1h' etc
    // );
    return {
      accessToken: token,
    };
  }
}
