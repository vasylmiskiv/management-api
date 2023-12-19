import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import * as config from 'config';

const dbConfig = config.get('db');

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    return {
      type: dbConfig.type,
      host: dbConfig.host,
      port: dbConfig.port,
      database: dbConfig.database,
      username: dbConfig.username,
      password: dbConfig.password,
      entities: [__dirname + '/../**/*.entity.{js, ts}'],
      migrations: [__dirname + '/../migrations/*{.js, .ts}'],
      synchronize: dbConfig.synchronize,
      autoLoadEntities: true,
      logging: true,
    };
  },
};

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: dbConfig.host,
  port: dbConfig.port,
  database: dbConfig.database,
  username: dbConfig.username,
  password: dbConfig.password,
  entities: ['dist/entities/**/*{.js,.ts}'],
  migrations: ['dist/migrations/**/*{.js,.ts}'],
  // cli: {
  //   migrationDir: __dirname + '/../migrations',
  // },
  synchronize: dbConfig.synchronize,
  autoLoadEntities: true,
  logging: true,
};
