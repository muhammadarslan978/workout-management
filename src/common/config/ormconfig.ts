import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

const ormconfig: DataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: 5432,
  username: process.env.DATABASE_USER || 'root',
  password: process.env.DATABASE_PASSWORD || 'root',
  database: process.env.DATABASE_NAME || 'root',
  entities: [`${__dirname}/../../modules/**/*.entity.{ts,js}`],
  migrations: [`${__dirname}/../../modules/database/migrations/*{.ts,.js}`], // Correct path
  synchronize: false,
  logging: process.env.TYPEORM_LOGGING === 'true',
  migrationsRun: true,
});

export default ormconfig;
