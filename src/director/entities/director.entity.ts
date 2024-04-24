import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { Movie } from '../../movie/entities/movie.entity';
import { IsString, IsOptional, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../entities/base.entity';

@Entity('directors')
export class Director extends BaseEntity {
  @IsString()
  @Column({ length: 100 })
  @ApiProperty({ required: true, example: 'Christopher Nolan' })
  name: string;

  @IsOptional()
  @IsArray()
  @ManyToMany(() => Movie)
  @JoinTable()
  @ApiProperty({ required: false, type: () => [Movie] })
  movies: Movie[];
}
