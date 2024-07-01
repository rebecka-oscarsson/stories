import { Pool } from "pg";

export const connectDb = async () => {
  try {
    //om jag skriver new Client blir det bara en anslutning och det är dåligt
    //för jag måste ansluta varje gång jag gör en query
      const pool = new Pool({
          user: process.env.PGUSER,
          host: process.env.PGHOST,
          database: process.env.PGDATABASE,
          password: process.env.PGPASSWORD,
          port: Number(process.env.PGPORT), //måste göra till number för typescript klagar annars
      });
      await pool.connect()
      return pool
  } catch (error) {
      console.log('nu blev det fel', error)
  }
}


