import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { Movie } from '../entities/movie.entity';
import { IsString, IsArray, ArrayNotEmpty } from 'class-validator';
import { Director } from 'src/director/entities/director.entity';
import { Genre } from 'src/genre/entities/genre.entity';
export class CreateMovieDto extends PartialType(
  OmitType(Movie, ['id', 'createdAt', 'updatedAt'] as const),
) {
  @ApiProperty({
    required: true,
    description: 'Title of the movie',
  })
  title: string;

  @ApiProperty({
    required: true,
    description: 'Description of the movie',
  })
  description: string;

  @ApiProperty({
    required: true,
    description: 'Release date of the movie',
  })
  releaseDate: Date;

  @ApiProperty({
    required: true,
    description: 'Duration of the movie',
  })
  duration: number;

  @ApiProperty({
    required: true,
    description: 'Rating of the movie',
  })
  rating: number;

  @ApiProperty({
    required: true,
    description: 'URL of the movie cover image',
  })
  coverImageUrl: string;

  @ApiProperty({
    type: [String],
    required: true,
    description: 'IDs of genres associated with the movie',
  })
  @IsArray()
  @ArrayNotEmpty()
  genreIds: string[]; // IDs of genres

  @ApiProperty({
    type: [String],
    required: true,
    description: 'IDs of directors associated with the movie',
  })
  @IsArray()
  @ArrayNotEmpty()
  directorIds: string[]; // IDs of directors
}
