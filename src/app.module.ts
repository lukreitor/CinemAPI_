import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovieModule } from './movie/movie.module';
import { UserModule } from './user/user.module';
import { GenreModule } from './genre/genre.module';
import { DirectorModule } from './director/director.module';
import { AuthModule } from './auth/auth.module';
import { RedisConfig } from './config/redis';
import { TypeOrmConfig } from './config/database';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig()),
    BullModule.forRoot(RedisConfig()),
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
