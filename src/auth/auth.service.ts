import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  /**
   * The function `validateUser` asynchronously validates a user by checking their email and password
   * against stored values.
   * @param {string} email - Email is a string that represents the user's email address.
   * @param {string} password - The `password` parameter in the `validateUser` function is a string
   * that represents the password input provided by a user for validation.
   * @returns If the user is found and the password matches, the function will return the user object
   * without the password field. If the user is not found or the password does not match, it will
   * return null.
   */
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  /**
   * The login function generates a JWT access token with a specified expiration time based on the
   * user's email and user ID.
   * @param {any} user - The `user` parameter in the `login` function seems to be an object containing
   * at least two properties: `email` and `userId`. These properties are used to create a JWT payload
   * for generating an access token.
   * @returns The `login` function is returning an object with an `access_token` property that contains
   * a JSON Web Token (JWT) signed with a payload containing the user's email and userId. The JWT
   * expires in 60 minutes.
   */
  async login(user: any) {
    const payload = { email: user.email, sub: user.userId };
    return {
      access_token: jwt.sign(payload, 'SECRET', { expiresIn: '60m' }),
    };
  }

  /**
   * The function `validate` takes an access token, verifies it using a secret key, and then finds a
   * user by email using the UserService.
   * @param {string} accessToken - The `accessToken` parameter is a string that represents the access
   * token used for authentication.
   * @returns The `validate` function is returning a Promise that resolves to the result of calling
   * `this.userService.findByEmail(payload.email)`.
   */
  async validate(accessToken: string): Promise<any> {
    const payload = jwt.verify(accessToken, 'SECRET') as JwtPayload;
    return this.userService.findByEmail(payload.email);
  }
}
