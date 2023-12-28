import { NextResponse } from "next/server";import { connectDb } from "@/app/db";

// Handles GET requests to /api/chapters
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  console.log("tryckt på id ", id);
  const client = await connectDb()
  const result = await client?.query(
    `SELECT * FROM chapter WHERE story_id = ${id} order by position`
  );
  console.log("bakändan har hämtat", result?.rows);
  //await client?.end()
  return NextResponse.json({ chapters: result?.rows });
}

// Handles POST requests to /api
//skabort för jag hanterar det i formuläret istället
// export async function POST(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   const client = await connectDb()
//   const id = params.id;
//   const highestPosition = await client?.query(
//     `SELECT MAX(position) FROM chapter WHERE story_id = ${id}`
//   );
//   ("insert into chapter(position, text, author) values((SELECT MAX(position) + 1 FROM chapter WHERE story_id = ${id}), 'en text', 'fontus');");
//   // ...
//   return NextResponse.json({ message: `högsta numret är ${highestPosition}` });
// }
