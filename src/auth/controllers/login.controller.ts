import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiProperty,
} from '@nestjs/swagger';

import { LoginBodyDto } from '../dto/login-body.dto';

@ApiTags('Login')
@Controller('login')
export class LoginController {
  constructor(private authService: AuthService) {}

  @Post()
  @ApiOperation({ summary: 'Log in a user.' })
  @ApiBody({ type: LoginBodyDto, description: "The user's credentials." })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully logged in.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async login(@Body() body: LoginBodyDto) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.authService.login(user);
  }
}
