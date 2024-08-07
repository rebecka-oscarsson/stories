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
    await pool.connect();
    return pool;
  } catch (error) {
    console.log("nu blev det fel", error);
  }
};

export async function getCurrentStory() {
  const client = await connectDb();
  const storyId = (await client?.query("SELECT story_id FROM current_story"))?.rows[0].story_id;
  //kolla om detta kan hämtas ut i getStory
  //fixa: för många frågetecken
  const numberOfChapters = (await client?.query(
    `SELECT count(*) FROM chapter WHERE story_id = ${storyId}`
  ))?.rows[0].count;
  //det här blir fel om det inte går att hämta, då blir det noll kapitel dvs ny saga
  //fixa, hur?

  return {
    lastChapter: numberOfChapters >= 9,
    firstChapter: numberOfChapters == 0,
    id: storyId,
  };
}
