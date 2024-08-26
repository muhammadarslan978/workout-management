import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

const ormconfig: DataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.PORT || '5432', 10),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [`${__dirname}/../../modules/**/*.entity.{ts,js}`],
  migrations: [`${__dirname}/../../modules/database/migrations/*{.ts,.js}`], // Correct path
  synchronize: false,
  logging: process.env.TYPEORM_LOGGING === 'true',
  migrationsRun: true,
});

export default ormconfig;
