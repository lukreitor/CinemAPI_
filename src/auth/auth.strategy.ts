import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/entities/User.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity)
    private _userRepository: Repository<UserEntity>,
    private authService: AuthService,
  ) {
    super({ passReqToCallback: true });
  }

  async authenticate(req: Request) {
    try {
      const authorization = req.headers.authorization;

      if (!authorization) {
        this.error(new UnauthorizedException());
      }
      const accessToken = authorization.replace('Bearer ', '');

      const user = await this.authService.validate(accessToken);

      if (!user) {
        this.error(new UnauthorizedException());
      }

      const userEntity = await this._userRepository.findOne({
        where: { id: user.uid },
      });

      if (userEntity.active === false) {
        this.error(new UnauthorizedException('User disabled'));
      }

      if (userEntity.isAdmin) {
        this.success(userEntity);
      }

      if (userEntity.isValidUser === false) {
        this.error(new UnauthorizedException('User not validated'));
      }

      this.success(userEntity);
    } catch (error) {
      this.error(new UnauthorizedException());
    }
  }
}
