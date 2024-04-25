import { OmitType, PartialType } from '@nestjs/swagger';
import { UserEntity } from '../entities/User.entity';
import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateUserDto extends PartialType(
  OmitType(UserEntity, ['id', 'createdAt', 'updatedAt'] as const),
) {
  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @IsOptional()
  @IsBoolean()
  isValidUser?: boolean;

  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @IsOptional()
  @IsBoolean()
  isAdmin?: boolean;
}
