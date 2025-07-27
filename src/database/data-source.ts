import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load env file
const env = process.env.NODE_ENV || 'development';

dotenv.config({
  path: path.resolve(__dirname, `../../environments/.env.${env}`),
});

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: true,
  entities: [
    env === 'production'
      ? 'dist/database/entities/*.entity.js'
      : 'src/database/entities/*.entity.ts',
  ],
  migrations: [
    env === 'production'
      ? 'dist/database/migrations/*.js'
      : 'src/database/migrations/*.ts',
  ],
  charset: 'utf8mb4',
  extra: {
    charset: 'utf8mb4',
  },
});
