import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiProperty,
} from '@nestjs/swagger';
import { InternalServerErrorException } from '@nestjs/common';
import { LoginBodyDto } from '../dto/login-body.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Login')
@Controller('login')
export class LoginController {
  constructor(private authService: AuthService) {}

  //@UseGuards(AuthGuard('local'))
  @Post()
  @ApiOperation({ summary: 'Log in a user.' })
  @ApiBody({ type: LoginBodyDto, description: "The user's credentials." })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully logged in.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async login(@Body() body: LoginBodyDto) {
    try {
      const user = await this.authService.validateUser(
        body.email,
        body.password,
      );
      if (!user) {
        throw new UnauthorizedException();
      }
      return this.authService.login(user);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error logging in user');
    }
  }
}
