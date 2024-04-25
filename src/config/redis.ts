import { BullModuleOptions } from '@nestjs/bull';
import 'dotenv/config';

export const RedisConfig = () =>
  ({
    redis: {
      host: process.env.REDIS_DB_HOST || 'localhost',
      port: Number(process.env.REDIS_DB_PORT) || 6379,
    },
  }) as BullModuleOptions;
