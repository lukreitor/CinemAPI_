import { Entity, Column, ManyToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNumber,
  IsDate,
  IsArray,
} from 'class-validator';
import { Genre } from '../../genre/entities/genre.entity';
import { Director } from '../../director/entities/director.entity';
import { BaseEntity } from '../../entities/base.entity';

@Entity()
export class Movie extends BaseEntity {
  constructor() {
    super();
  }

  @IsString()
  @Column()
  @ApiProperty({ required: true, example: 'The Shawshank Redemption' })
  title: string;

  @IsString()
  @Column('text')
  @ApiProperty({
    required: true,
    example: 'Two imprisoned men bond over a number of years...',
  })
  description: string;

  @IsDate()
  @Column('date')
  @ApiProperty({ required: true, example: '1994-09-22' })
  releaseDate: Date;

  @IsNumber()
  @Column('int')
  @ApiProperty({ required: true, example: 142 })
  duration: number;

  @IsNumber()
  @Column('decimal', { precision: 5, scale: 2 })
  @ApiProperty({ required: true, example: 9.3 })
  rating: number;

  @IsOptional()
  @IsString()
  @Column({ nullable: true })
  @ApiProperty({ required: false })
  coverImageUrl?: string;

  @IsArray()
  @ManyToMany(() => Genre)
  @ApiProperty({ required: false, type: () => [Genre] })
  genres: Genre[];

  @IsArray()
  @ManyToMany(() => Director)
  @ApiProperty({ required: false, type: () => [Director] })
  directors: Director[];
}
