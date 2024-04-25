import {
  //BadRequestException,
  CanActivate,
  ExecutionContext,
  SetMetadata,
  UnauthorizedException,
} from '@nestjs/common';
import { UserEntity } from 'src/user/entities/User.entity';
import { Profiles } from 'src/helpers/profiles.enum';

export const ProfileAccess = (data: Profiles[]) =>
  SetMetadata('profileAccess', data);

export class ProfileAccessGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const profiles = Reflect.getMetadata(
      'profileAccess',
      context.getHandler(),
    ) as Profiles[];
    const request = context.switchToHttp().getRequest();
    const userEntity = request['user'] as UserEntity;

    if (profiles.includes(Profiles.Admin)) {
      if (userEntity.isAdmin !== true) {
        throw new UnauthorizedException(
          'administrator account access required',
        );
      }
    }
    return true;
  }
}
