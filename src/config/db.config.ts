
import dotenv from 'dotenv';
import { DataSource } from 'typeorm'
import Entities from '../models';

dotenv.config();
export const AppDataSource: DataSource = new DataSource({
  port: 5432,
  logging: true,
  type: 'postgres',
  host: 'localhost',
  database: process.env.POSTGRESQL_DB_NAME,
  username: process.env.POSTGRESQL_USERNAME,
  password: process.env.POSTGRESQL_PASSWORD,
  synchronize: true,
  entities: { ...Entities },
})

async function initializeDB() {
  try {
    await AppDataSource.initialize();
    console.log('Database connected successfully! ✅')
  } catch (error) {
    console.log(error)
  }
}

export default initializeDB;