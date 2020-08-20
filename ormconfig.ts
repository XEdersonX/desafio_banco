import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'postgres',
  host: `${process.env.HOST}`,
  port: Number(process.env.PORT),
  username: `${process.env.USERNAME}`,
  password: `${process.env.PASSWORD}`,
  database: `${process.env.DATABASE}`,
  entities: ['./src/models/*.ts'],
  migrations: ['./src/database/migrations/*.ts'],
  cli: {
    migrationsDir: './src/database/migrations',
  },
};

export default config;
