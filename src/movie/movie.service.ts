import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  findAll() {
    return this.movieRepository.find();
  }

  async findOne(id: string) {
    const movie = await this.movieRepository.findOne({ where: { id } });
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    return movie;
  }

  async update(id: string, updateMovieDto: UpdateMovieDto) {
    const movie = await this.movieRepository.findOne({ where: { id } });
    if (!movie) {
      throw new Error('Movie not found');
    }
    Object.assign(movie, updateMovieDto);
    return this.movieRepository.save(movie);
  }

  async remove(id: string) {
    const movie = await this.movieRepository.findOne({ where: { id } });
    if (!movie) {
      throw new Error('Movie not found');
    }
    return this.movieRepository.remove(movie);
  }

  async createMovie(createMovieDto: CreateMovieDto): Promise<Movie> {
    const movie = new Movie();
    Object.assign(movie, createMovieDto);
    return this.movieRepository.save(movie);
  }
}
