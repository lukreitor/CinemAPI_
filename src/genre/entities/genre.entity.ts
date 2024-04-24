import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { Movie } from '../../movie/entities/movie.entity';
import { IsString, IsOptional, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../entities/base.entity';

@Entity('genres')
export class Genre extends BaseEntity {
  @IsString()
  @Column({ length: 50 })
  @ApiProperty({ required: true, example: 'Drama' })
  name: string;

  @IsOptional()
  @IsArray()
  @ManyToMany(() => Movie)
  @JoinTable()
  @ApiProperty({ required: false, type: () => [Movie] })
  movies: Movie[];
}
