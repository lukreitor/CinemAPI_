import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { UserController } from '../user/user.controller';
//import { LocalStrategy } from './auth.strategy';
import { JwtAuthGuard } from './auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/User.entity';
//import { JwtStrategy } from './jwt.strategy';
//import { ProfileAccess } from './profiles.auth.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'SECRET', // replace with your own secret
      signOptions: { expiresIn: '60m' },
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [
    AuthService,
    UserService,
    //LocalStrategy,
    //JwtStrategy,
    JwtAuthGuard,
  ],
  controllers: [UserController],
  exports: [AuthService, JwtAuthGuard],
})
export class AuthModule {}
