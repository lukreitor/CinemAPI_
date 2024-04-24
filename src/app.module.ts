import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
