import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const TypeOrmConfig = () =>
  ({
    type: 'postgres',
    host: 'localhost',
    port: 5433,
    username: 'postgres',
    password: 'root',
    database: 'movie_catalog',
    autoLoadEntities: true,
    synchronize: true, // WARNING: Desabilitar em produção!
    logging: true,
    entities: [
      'dist/src/entities/*.entity.js',
      'dist/director/entities/*.entity.js',
      'dist/genre/entities/*.entity.js',
      'dist/movie/entities/*.entity.js',
      'dist/user/entities/*.entity.js',
    ],
  }) as TypeOrmModuleOptions;
