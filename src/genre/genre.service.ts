import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from './entities/genre.entity';

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>,
  ) {}

  findAll() {
    return this.genreRepository.find();
  }

  async findOne(id: string) {
    const genre = await this.genreRepository.findOne({ where: { id } });
    if (!genre) {
      throw new NotFoundException('Genre not found');
    }
    return genre;
  }

  async update(id: string, updateGenreDto: UpdateGenreDto) {
    const genre = await this.genreRepository.findOne({ where: { id } });
    if (!genre) {
      throw new Error('Genre not found');
    }
    Object.assign(genre, updateGenreDto);
    return this.genreRepository.save(genre);
  }

  async remove(id: string) {
    const genre = await this.genreRepository.findOne({ where: { id } });
    if (!genre) {
      throw new Error('Genre not found');
    }
    return this.genreRepository.remove(genre);
  }

  async createGenre(createGenreDto: CreateGenreDto): Promise<Genre> {
    const genre = new Genre();
    Object.assign(genre, createGenreDto);
    return this.genreRepository.save(genre);
  }
}
