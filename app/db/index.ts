import { Client, Pool } from "pg";

export const connectDb = async () => {
  try {
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
      console.log(error)
  }
}

//används ej ta bort
export async function connectClient() {
const client = 
  new Client({
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT), //måste göras för typescript klagar annars
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
});
await client.connect()
return client
}


