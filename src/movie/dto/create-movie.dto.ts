import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Movie } from '../entities/movie.entity';
import { IsString } from 'class-validator';

export class CreateMovieDto {
  @ApiProperty({
    required: true,
  })
  title: string;

  @ApiProperty({
    required: true,
  })
  description: string;

  @ApiProperty({
    required: true,
  })
  releaseDate: Date;

  @ApiProperty({
    required: true,
  })
  duration: number;

  @ApiProperty({
    required: true,
  })
  rating: number;

  @ApiProperty({
    required: true,
  })
  coverImageUrl: string;
}
