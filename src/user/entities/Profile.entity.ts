import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from 'src/entities/Base.entity';
import { IsDate, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from './User.entity';

@Entity('profile')
export class ProfileEntity extends BaseEntity {
  @IsString()
  @ApiProperty({
    required: true,
  })
  @Column()
  name: string;

  @IsString()
  @ApiProperty({
    required: false,
  })
  @Column({
    nullable: true,
  })
  country?: string;

  @IsString()
  @ApiProperty({
    example: '00000-000',
    required: false,
  })
  @Column({
    nullable: true,
  })
  zipcode?: string;

  @IsString()
  @ApiProperty({
    example: 'UF, State, Província, etc...',
    required: false,
  })
  @Column({
    nullable: true,
  })
  region?: string;

  @IsString()
  @ApiProperty({
    required: false,
  })
  @Column({
    nullable: true,
  })
  city?: string;

  @IsString()
  @ApiProperty({
    required: false,
  })
  @Column({
    nullable: true,
  })
  neighborhood?: string;

  @IsString()
  @ApiProperty({
    example: 'Rua, Praça, Street, Avenue, etc...',
    required: false,
  })
  @Column({
    nullable: true,
  })
  preaddress?: string;

  @IsString()
  @ApiProperty({
    required: false,
  })
  @Column({
    nullable: true,
  })
  address?: string;

  @IsString()
  @ApiProperty({
    required: false,
  })
  @Column({
    nullable: true,
  })
  addressnumber?: string;

  @IsString()
  @ApiProperty({
    example: 'Casa, Lote, Apartment, Floor, etc...',
    required: false,
  })
  @Column({
    nullable: true,
  })
  addressdetail?: string;

  @IsString()
  @ApiProperty({
    required: true,
  })
  @Column({
    unique: true,
  })
  document: string;

  @IsDate()
  @ApiProperty({
    required: false,
  })
  @Column({
    nullable: true,
  })
  birthdate?: Date;

  @IsString()
  @ApiProperty({
    required: true,
  })
  @Column()
  telephone: string;

  @ApiProperty({
    required: true,
  })
  @OneToOne(() => UserEntity, (user) => user.profile)
  @JoinColumn()
  user: UserEntity;
}
