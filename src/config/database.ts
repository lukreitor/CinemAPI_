import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/User.entity';
import { ProfileEntity } from 'src/user/entities/Profile.entity';
import { BaseEntity } from 'src/entities/base.entity';
import { MovieModule } from 'src/movie/movie.module';

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
    logging: false,
    entities: [BaseEntity, ProfileEntity, 'dist/src/entities/*.entity.js'],
  }) as TypeOrmModuleOptions;
