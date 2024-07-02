"use server";
import { revalidatePath } from "next/cache";
import { connectDb } from '@/app/db';

export async function getData(url:string) {
  url = process.env.NEXT_PUBLIC_MY_BACKEND_URL + url
  const res = await fetch(url)
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    // Vad betyder detta? Läs på
    throw new Error('lyckades inte hitta någon data')
  }
  return res.json()
}

export async function addChapter(prevState: string, formData: FormData) {
  const chapter = formData.get("chapter");
  const title = formData.get("title");
  const author = formData.get("author");
  try {
    const client = await connectDb();
    const result = await client?.query(
      //coalesce är en postgres-funktion som returnerar första icke-null-parametern
      //dollartecknen med siffror skickar parametrarna till postgres för att undvika sql-injections (de slås ej ihop med query-strängen)
      `INSERT INTO chapter (position, story_id, title, author, created_at, contents) 
      VALUES (coalesce((SELECT MAX(position) + 1 FROM chapter WHERE story_id = (SELECT story_id FROM current_story)), 0),
      (SELECT story_id FROM current_story), $1, $2, now(), $3)`, [title, author, chapter]
    );
    //await client?.end(); //har jag med det här funkar det ej
    console.log('från actions.ts', result?.rows);
    revalidatePath('/write')
    return 'Your chapter called ' + title + ' was submitted';
    
  } catch (e) {
    
    //här ska jag validera den path som hämtar datan om kapitel eller sagor
    return "nehepp, " + e;
  } 
}
