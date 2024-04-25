import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { UserEntity } from '../entities/User.entity';
import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateUserDto extends PartialType(
  OmitType(UserEntity, ['id', 'createdAt', 'updatedAt'] as const),
) {
  @ApiProperty({
    type: String,
    required: true,
    description: 'Email of the user',
  })
  @IsString()
  email: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Password of the user',
  })
  @IsString()
  password: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'URL of the user avatar',
  })
  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @ApiProperty({
    type: Boolean,
    required: false,
    description: 'Is user valid',
  })
  @IsOptional()
  @IsBoolean()
  isValidUser?: boolean;

  @ApiProperty({
    type: Boolean,
    required: false,
    description: 'Is user active',
  })
  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @ApiProperty({
    type: Boolean,
    required: false,
    description: 'Is user an admin',
  })
  @IsOptional()
  @IsBoolean()
  isAdmin?: boolean;
}
