import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm';
import { v4 as UniqueID } from 'uuid';

export class BaseEntity {
  constructor() {
    this.id = UniqueID();
  }

  @PrimaryColumn()
  @ApiProperty({
    example: '6ef05f4e-49e1-4d14-8f06-682a9ba8adf3',
    required: true,
  })
  readonly id?: string;

  @ApiProperty({
    required: false,
    example: '2023/08/01 11:14',
  })
  @IsOptional()
  @CreateDateColumn()
  createdAt?: Date;

  @IsOptional()
  @UpdateDateColumn()
  @ApiProperty({
    required: false,
    example: '2023/08/01 11:14',
  })
  updatedAt?: Date;
}
