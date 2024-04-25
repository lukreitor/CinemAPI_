import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Req,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user-profile.dto';
import { UpdateUserDto } from './dto/update-user.dto';
//import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody } from '@nestjs/swagger';
//import { JwtAuthGuard } from 'src/auth/jwt.guard';
//import { ProfileAccess } from 'src/auth/profiles.auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    // private readonly authService: AuthService,
  ) {}

  @Get('findAll')
  findAll() {
    return this.userService.findAll();
  }

  @Get('FindOne:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch('Update:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete('Remove:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Post('register')
  @ApiBody({ type: CreateUserDto })
  async register(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Post('login')
  async login(@Req() req) {
    //return this.authService.login(req.user);
  }
}
