import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { Movie } from './entities/movie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genre } from '../genre/entities/genre.entity';
import { Director } from '../director/entities/director.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Genre, Director])],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}
