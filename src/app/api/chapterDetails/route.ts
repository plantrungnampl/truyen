import { ChapterDetailResponse } from "@/types/type";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const chapterId = searchParams.get("chapterId");

  if (!chapterId) {
    return NextResponse.json(
      { error: "chapterId is required" },
      { status: 400 }
    );
  }

  try {
    // Gọi API để lấy chi tiết chapter hiện tại
    const chapterResponse = await axios.get<ChapterDetailResponse>(
      `https://api.mangadex.org/chapter/${chapterId}`
    );
    const chapterData = chapterResponse.data;

    // Lấy mangaId từ dữ liệu chương hiện tại
    const mangaId = chapterData.data.relationships.find(
      (rel) => rel.type === "manga"
    )?.id;

    if (!mangaId) {
      return NextResponse.json(
        { error: "Manga ID not found for this chapter" },
        { status: 400 }
      );
    }

    const pagesResponse = await axios.get(
      `https://api.mangadex.org/at-home/server/${chapterId}`
    );
    const pagesData = pagesResponse.data;

    const chapterDetail = {
      ...chapterData,

      pages: pagesData.chapter.data.map(
        (page: string) =>
          `${pagesData.baseUrl}/data/${pagesData.chapter.hash}/${page}`
      ),
    };

    const response = NextResponse.json(chapterDetail);
    response.headers.set(
      "Cache-Control",
      "s-maxage=300, stale-while-revalidate"
    );
    return response;
  } catch (error) {
    console.error("Error fetching chapter details:", error);
    return NextResponse.json(
      { error: "Failed to fetch chapter details" },
      { status: 500 }
    );
  }
}
