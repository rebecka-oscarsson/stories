import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import { getCurrentStory } from "@/app/db";

// Handles GET requests to /api
export async function GET(request: NextRequest): Promise<Response> {
const currentStory =  await getCurrentStory();
  console.log("från routen /current_story", currentStory);
  return NextResponse.json(
    currentStory
  );
}

// Handles POST requests to /api
export async function POST(request: Request) {
  // ...
  return NextResponse.json({ message: "Post till min egen bakända" });
}
