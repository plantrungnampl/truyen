import { searchManga } from "@/lib/mangaSearch";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query") || "";
    console.log("Query string:", query);
    if (!query) {
      return NextResponse.json(
        { error: "Query string is empty" },
        { status: 400 }
      );
    }
    const data = await searchManga(query);
    console.log("Data search from sẻvrer", data);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to search manga" },
      { status: 500 }
    );
  }
}
