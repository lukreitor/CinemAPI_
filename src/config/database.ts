import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/User.entity';
import { ProfileEntity } from 'src/user/entities/Profile.entity';
import { BaseEntity } from 'src/entities/base.entity';
import { MovieModule } from 'src/movie/movie.module';

export const TypeOrmConfig = () =>
  ({
    type: 'postgres',
    host: process.env.POSTGRES_DB_HOST || 'localhost',
    port: Number(process.env.POSTGRES_DB_PORT) || 5433,
    username: process.env.POSTGRES_DB_USER || 'postgres',
    password: process.env.POSTGRES_DB_PASSWORD || 'root',
    database: process.env.POSTGRES_DB_NAME || 'movie_catalog',
    autoLoadEntities: true,
    synchronize: true,
    logging: false,
    entities: [
      ProfileEntity,
      'dist/**/*.entity{.ts,.js}',
      BaseEntity,

      'dist/src/entities/*.entity.js',
    ],
  }) as TypeOrmModuleOptions;
