import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.userId };
    return {
      access_token: jwt.sign(payload, 'SECRET', { expiresIn: '60m' }),
    };
  }

  async validate(accessToken: string): Promise<any> {
    const payload = jwt.verify(accessToken, 'SECRET') as JwtPayload;
    return this.userService.findByEmail(payload.email);
  }
}
