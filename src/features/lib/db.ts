import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export async function connectDB() {
  const connection = await mysql.createConnection({
    host: process.env.NEXT_DB_HOST || 'localhost',
    port: Number(process.env.NEXT_DB_PORT) || 3306,
    user: process.env.NEXT_DB_USER || 'root',
    password: process.env.NEXT_DB_PASSWORD || 'root',
    database: process.env.NEXT_DB_NAME || 'dashboard',
  });

  return connection;
}
