import { Module } from '@nestjs/common';
import { RedisModule } from 'nestjs-redis';

@Module({
  imports: [
    RedisModule.register({
      url: process.env.REDIS_URL || 'redis://localhost:6379',
    }),
  ],
  exports: [RedisModule],
})
export class DatabaseModule {}
