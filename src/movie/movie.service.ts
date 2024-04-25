import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { Genre } from 'src/genre/entities/genre.entity';
import { Director } from 'src/director/entities/director.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>,
    @InjectRepository(Director)
    private directorRepository: Repository<Director>,
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

  /**
   * The function `createMovie` creates a new movie entity with genres and directors based on the
   * provided data.
   * @param {CreateMovieDto} createMovieDto - CreateMovieDto is a data transfer object that contains
   * information about a movie to be created. It typically includes properties such as title,
   * description, release date, genres (as an array of genre IDs), and director IDs (as an array of
   * director IDs).
   * @returns The `createMovie` function is returning a Promise that resolves to a `Movie` object after
   * creating and saving a new movie entity in the database.
   */
  async createMovie(createMovieDto: CreateMovieDto): Promise<Movie> {
    const genres = await this.genreRepository.findBy({
      id: In(createMovieDto.genres),
    });
    const directors = await this.directorRepository.findBy({
      id: In(createMovieDto.directorIds),
    });

    const movie = this.movieRepository.create({
      ...createMovieDto,
      genres,
      directors,
    });

    return this.movieRepository.save(movie);
  }
}
