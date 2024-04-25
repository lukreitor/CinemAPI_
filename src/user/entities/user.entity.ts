import { Entity, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional } from 'class-validator';
import { ProfileEntity } from './profile.entity';
import { Movie } from 'src/movie/entities/movie.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  constructor() {
    super();
  }

  @IsString()
  @Column({ unique: true })
  @ApiProperty({ required: true, example: 'user@example.com' })
  email: string;

  @IsString()
  @Column()
  @ApiProperty({ required: true, example: 'password' })
  password: string;

  @IsOptional()
  @IsString()
  @Column({ nullable: true })
  @ApiProperty({ required: false })
  avatarUrl?: string;

  @IsOptional()
  @IsBoolean()
  @Column({ default: false })
  @ApiProperty({ required: false })
  isValidUser?: boolean;

  @IsOptional()
  @IsBoolean()
  @Column({ default: true })
  @ApiProperty({ required: false, example: true })
  active?: boolean = true;

  @IsOptional()
  @IsBoolean()
  @Column({ default: false })
  @ApiProperty({ required: false, example: false })
  isAdmin?: boolean = false;

  @OneToMany(() => Movie, (movie) => movie.user)
  movies: Movie[];

  @OneToOne(() => ProfileEntity, (profile) => profile.user)
  @JoinColumn()
  profile: ProfileEntity;
}
