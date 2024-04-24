import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './config/database';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovieModule } from './movie/movie.module';
import { UserModule } from './user/user.module';
import { GenreModule } from './genre/genre.module';
import { DirectorModule } from './director/director.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig()),
    MovieModule,
    UserModule,
    GenreModule,
    DirectorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
