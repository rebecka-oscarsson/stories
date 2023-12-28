"use server";
import { revalidatePath } from "next/cache";
import { connectDb } from '@/app/db'


export async function addChapter(prevState: any, formData: FormData) {
  const chapter = formData.get("chapter");
  const title = formData.get("title");
  const author = formData.get("author");

  try {
    const client = await connectDb();
    const result = await client?.query(
      //coalesce är en postgres-funktion som returnerar första icke-null-parametern
      //dollartecknen med siffror skickar parametrarna till postgres för att undvika sql-injections (de slås ej ihop med query-strängen)
      `INSERT INTO chapter (position, story_id, title, author, created_at, contents) 
      VALUES (coalesce((SELECT MAX(position) + 1 FROM chapter WHERE story_id = 6), 0),
       6, $1, $2, now(), $3)`, [title, author, chapter]
    );
    //await client?.end(); //har jga det här funkar det ej
    console.log(result);
    return { message: title };
  } catch (e) {
    //   revalidatePath('/')
    //här ska jag validera den path som hämtar datan om kapitel eller sagor
    return { message: "nehepp, " + e };
  }
  
}
