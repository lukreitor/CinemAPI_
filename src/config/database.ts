import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/User.entity';
import { ProfileEntity } from 'src/user/entities/Profile.entity';
import { BaseEntity } from 'src/entities/base.entity';
import { MovieModule } from 'src/movie/movie.module';

export const TypeOrmConfig = () =>
  ({
    type: 'postgres',
    host: process.env.HOST || 'localhost',
    port: parseInt(process.env.PORT) || 5432,
    username: process.env.USERNAME || 'root',
    password: process.env.PASSWORD || 'root',
    database: process.env.DATABASE || 'movie_catalog',
    autoLoadEntities: false,
    synchronize: true, // WARNING: Desabilitar em produção!
    logging: false,
    entities: [BaseEntity, ProfileEntity, 'dist/src/entities/*.entity.js'],
  }) as TypeOrmModuleOptions;
