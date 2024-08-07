"use server";import { revalidatePath } from "next/cache";
import { connectDb } from "@/app/db";
import { getCurrentStory } from "@/app/db";

export async function getData(url: string) {
  url = process.env.NEXT_PUBLIC_MY_BACKEND_URL + url;
  const res = await fetch(url);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("lyckades inte hitta någon data");
  }
  return res.json();
}

export async function addChapter(prevState: string, formData: FormData) {
  let currentStory = await getCurrentStory();
  //om det är sista kapitlet ska ett nytt id på current story genereras här
  //titel och författare blir null
  //titel-fält visas om det är första kapitlet
  //titel ska postas till stories och nytt id ska genereras
  //dubbelkolla först att det är sista/första kapitlet
  const chapter = formData.get("chapter");
  const title = formData.get("title");
  const author = formData.get("author");
  const storyTitle = formData.get("storyTitle");
  try {
    const client = await connectDb();
    await client?.query(
      //coalesce är en postgres-funktion som returnerar första icke-null-parametern
      //dollartecknen med siffror skickar parametrarna till postgres för att undvika sql-injections (de slås ej ihop med query-strängen)
      `INSERT INTO chapter (position, story_id, title, author, created_at, contents) 
      VALUES (coalesce((SELECT MAX(position) + 1 FROM chapter WHERE story_id = (SELECT story_id FROM current_story)), 0),
      (SELECT story_id FROM current_story), $1, $2, now(), $3)`,
      [title, author, chapter]
    );
    //await client?.end(); //har jag med det här funkar det ej
    //om sista kapitlet postats, starta en ny story som får ett automatiskt id men inte har någon titel än
    if (currentStory.lastChapter) {
      console.log("last chapter");
      await client?.query(
        `INSERT INTO story (title, position) VALUES (null, coalesce((SELECT MAX(position) + 1 FROM story), 0))`
      );
      await client?.query(
        //skicka in nya id:t som current story
        `UPDATE current_story set story_id= (SELECT id from story where position = (SELECT MAX(position) FROM story))`
      );
    }
    //om en ny story title skickats in (dvs det ör första kapitlet i en ny saga), stoppa in den
    if (storyTitle) {
      await client?.query(
        `UPDATE story set title=$1 where id=(SELECT story_id FROM current_story)`,
        [storyTitle]
      );
      revalidatePath("/stories");
    }
    //det måste finnas en current_story rad från start annars kan man inte göra update
    //om två rader error: mer än en rad returnerades från underfråga som används som uttryck
    //fixa: gammalt felmeddelande visas nästa uppdatering
    revalidatePath("/write");
    return "Your chapter called " + title + " was submitted";
  } catch (e) {
    return "nehepp, " + e;
  }
}
