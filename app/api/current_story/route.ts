import { NextResponse } from "next/server";import { type NextRequest } from "next/server";
import { connectDb } from "@/app/db";

// Handles GET requests to /api
export async function GET(request: NextRequest): Promise<Response> {
  const client = await connectDb();
  console.log("nu hämtas routen /current_story");
  const getStory = await client?.query("SELECT story_id FROM current_story");
  // const currentStory = getStory?.rows[0];
  // const currentStoryChapters = await client?.query(
  //   `SELECT * FROM chapter WHERE story_id = ${currentStory.story_id} order by position`
  // );
  // const numberOfChapters = currentStoryChapters?.rowCount || 0;
  // const storyFinished = numberOfChapters >= 10;
  // console.log("data från /current_story", {
  //   finished: storyFinished,
  //   id: currentStory.story_id,
  //   contents: currentStoryChapters?.rows,
  // });
  return NextResponse.json(getStory?.rows[0].story_id
    // {
    //   finished: storyFinished,
    //   id: currentStory.story_id,
    //   contents: currentStoryChapters?.rows,
    // }
    //hämta kapitel i senaste boken och returnera om det går att skriva i (finished = boolean)
  );
}

// Handles POST requests to /api
export async function POST(request: Request) {
  // ...
  return NextResponse.json({ message: "Post till min egen bakända" });
}
