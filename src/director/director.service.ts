import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Director } from './entities/director.entity';

@Injectable()
export class DirectorService {
  constructor(
    @InjectRepository(Director)
    private directorRepository: Repository<Director>,
  ) {}

  findAll() {
    return this.directorRepository.find();
  }

  async findOne(id: string) {
    const director = await this.directorRepository.findOne({ where: { id } });
    if (!director) {
      throw new NotFoundException('Director not found');
    }
    return director;
  }

  async update(id: string, updateDirectorDto: UpdateDirectorDto) {
    const director = await this.directorRepository.findOne({ where: { id } });
    if (!director) {
      throw new Error('Director not found');
    }
    Object.assign(director, updateDirectorDto);
    return this.directorRepository.save(director);
  }

  async remove(id: string) {
    const director = await this.directorRepository.findOne({ where: { id } });
    if (!director) {
      throw new Error('Director not found');
    }
    return this.directorRepository.remove(director);
  }

  async createDirector(
    createDirectorDto: CreateDirectorDto,
  ): Promise<Director> {
    const director = new Director();
    Object.assign(director, createDirectorDto);
    return this.directorRepository.save(director);
  }
}
