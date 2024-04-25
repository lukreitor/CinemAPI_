import { OmitType, PartialType } from '@nestjs/swagger';
import { Genre } from '../entities/genre.entity';
import { IsString, IsOptional, IsArray } from 'class-validator';
import { Movie } from '../../movie/entities/movie.entity';

export class CreateGenreDto extends PartialType(
  OmitType(Genre, ['id', 'createdAt', 'updatedAt', 'movies'] as const),
) {
  @IsString()
  name: string;

  @IsOptional()
  @IsArray()
  movies?: Movie[];
}
