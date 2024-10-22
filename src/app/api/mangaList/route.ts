"use server";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "10";
  const category = searchParams.get("category") || "popular"; // Lấy category từ client nếu cần
  const offset = (parseInt(page) - 1) * parseInt(limit);
  let orderParam;

  switch (category) {
    case "popular":
      orderParam = { followedCount: "desc" };
      break;
    case "new":
      orderParam = { updatedAt: "desc" };
      break;
    case "trending":
      orderParam = { createdAt: "desc" };
      break;
    case "seasonal":
      // Seasonal manga does not require ordering, handled separately
      break;
    default:
      orderParam = { followedCount: "desc" };
  }

  try {
    // Fetch popular, new, or trending manga
    let popularMangaData = null;
    if (category !== "seasonal") {
      const popularRes = await axios.get(
        `https://api.mangadex.org/manga?limit=${limit}&offset=${offset}`,
        {
          params: {
            includes: ["cover_art"],
            order: orderParam,
            limit,
            offset,
          },
        }
      );
      popularMangaData = popularRes?.data;
    }

    // Fetch Seasonal: Summer 2024 manga
    let seasonalMangaData = null;
    if (category === "seasonal") {
      const seasonalRes = await axios.get(
        `https://api.mangadex.org/manga?limit=${limit}&offset=${offset}`,
        {
          params: {
            includes: ["cover_art"],
            publicationDemographic: ["shounen"],
            year: "2024",
            // limit,
            // offset,
            // order: orderParam,
          },
        }
      );
      seasonalMangaData = seasonalRes?.data;
    }

    // Combine the two responses if needed
    const resultData =
      category === "seasonal" ? seasonalMangaData : popularMangaData;
    if (!resultData || !Array.isArray(resultData.data)) {
      return NextResponse.json(
        { error: "Invalid data format from MangaDex API" },
        { status: 500 }
      );
    }
    return NextResponse.json(resultData);
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
}
