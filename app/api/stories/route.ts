import { NextResponse } from "next/server";
import { connectDb } from '@/app/db'

// Handles GET requests to /api
export async function GET(request: Request) {
  const client = await connectDb()
  const result = await client?.query("SELECT * FROM story order by position");
  return NextResponse.json({'stories': result?.rows
  });
}

// Handles POST requests to /api
export async function POST(request: Request) {
  // ...
  return NextResponse.json({ message: "Post till min egen bakända" });
}
