import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovieModule } from './movie/movie.module';
import { UserModule } from './user/user.module';
import { GenreModule } from './genre/genre.module';
import { DirectorModule } from './director/director.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'root',
      database: 'movie_catalog',
      autoLoadEntities: true,
      synchronize: true, // WARNING: Desabilitar em produção!
    }),
    MovieModule,
    UserModule,
    GenreModule,
    DirectorModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
