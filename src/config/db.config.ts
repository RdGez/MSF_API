
import dotenv from 'dotenv';
import { DataSource } from 'typeorm'

dotenv.config();
const AppDataSource: DataSource = new DataSource({
  port: 5432,
  type: 'postgres',
  host: 'localhost',
  database: process.env.POSTGRESQL_DB_NAME,
  username: process.env.POSTGRESQL_USERNAME,
  password: process.env.POSTGRESQL_PASSWORD,
  entities: []
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