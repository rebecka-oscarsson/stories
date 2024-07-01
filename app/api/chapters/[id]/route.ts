import { NextResponse } from "next/server";import { connectDb } from "@/app/db";

// requests to /api/chapters = den hämtar alla kapitel i en saga med ett visst id
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const client = await connectDb()
  const result = await client?.query(
    `SELECT * FROM chapter WHERE story_id = ${id} order by position`
  );
  //await client?.end()
  return NextResponse.json(result?.rows);
}

// Handles POST requests to /api

// borde jag sätta form action här?
