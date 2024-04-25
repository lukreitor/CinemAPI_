import { OmitType, PartialType } from '@nestjs/swagger';
import { Director } from '../entities/director.entity';
import { IsString, IsOptional, IsArray } from 'class-validator';
import { Movie } from '../../movie/entities/movie.entity';

export class CreateDirectorDto extends PartialType(
  OmitType(Director, ['id', 'createdAt', 'updatedAt', 'movies'] as const),
) {
  @IsString()
  name: string;

  @IsOptional()
  @IsArray()
  movies?: Movie[];
}
