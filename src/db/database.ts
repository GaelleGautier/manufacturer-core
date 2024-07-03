import { Pool, createPool } from 'mysql2/promise'

export async function connect(): Promise<Pool> {
  try {
    const connection = await createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      connectionLimit: 20,
      waitForConnections: true,
      queueLimit: 0,
    })
    return connection
  } catch (err) {
    console.error('Error connecting to the database:', err)
    throw err
  }
}
