import { db } from "@/lib/db";
import { headers } from "next/headers";

export async function GET() {
  const auth = (await headers()).get("authorization");
  const apiKey = auth?.split(" ")[1];

  // Find the user by API key
  const User = await db.user.findUnique({
    where: { apiKey },
  });

  if (!User) {
    return Response.json(
      {
        status: 401,
        body: "Unauthorized",
      },
      { status: 401 }
    );
  }

  try {
    // Fetch travel data for the authenticated user
    const travelData = await db.travelData.findMany({
      where: { userId: User.id },
    });

    return Response.json({ success: true, data: travelData });
  } catch (error) {
    console.error("Error fetching travel data:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}