// import { ChapterDetailResponse } from "@/types/type";
// import axios from "axios";
// import { NextResponse } from "next/server";

// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const chapterId = searchParams.get("chapterId");

//   if (!chapterId) {
//     return NextResponse.json(
//       { error: "chapterId is required" },
//       { status: 400 }
//     );
//   }

//   try {
//     // Gọi API để lấy chi tiết chapter hiện tại
//     const chapterResponse = await axios.get<ChapterDetailResponse>(
//       `https://api.mangadex.org/chapter/${chapterId}`
//     );
//     const chapterData = chapterResponse.data;
//     console.log("chappter data===", chapterData);

//     // Lấy mangaId từ dữ liệu chương hiện tại
//     const mangaId = chapterData.data.relationships.find(
//       (rel) => rel.type === "manga"
//     )?.id;
//     if (!mangaId) {
//       return NextResponse.json(
//         { error: "Manga ID not found for this chapter" },
//         { status: 400 }
//       );
//     }

//     const pagesResponse = await axios.get(
//       `https://api.mangadex.org/at-home/server/${chapterId}`
//     );
//     const pagesData = pagesResponse.data;
//     // next---

//     // if (currentChapterIndex === -1) {
//     //   return NextResponse.json(
//     //     { error: "Chapter not found in the manga's chapter list" },
//     //     { status: 404 }
//     //   );
//     // }

//     // Xác định chương tiếp theo và chương trước đó

//     const chapterDetail = {
//       ...chapterData,

//       pages: pagesData.chapter.data.map(
//         (page: string) =>
//           `${pagesData.baseUrl}/data/${pagesData.chapter.hash}/${page}`
//       ),
//     };

//     const response = NextResponse.json(chapterDetail);
//     response.headers.set(
//       "Cache-Control",
//       "s-maxage=300, stale-while-revalidate"
//     );
//     return response;
//   } catch (error) {
//     console.error("Error fetching chapter details:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch chapter details" },
//       { status: 500 }
//     );
//   }
// }
import { AtHomeResponse, ChapterListResponse } from "@/types/mangaDetail";
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
    // 1. Fetch current chapter details
    const chapterResponse = await axios.get<ChapterDetailResponse>(
      `https://api.mangadex.org/chapter/${chapterId}`
    );
    const chapterData = chapterResponse.data;

    // 2. Get mangaId from relationships
    const mangaId = chapterData.data.relationships.find(
      (rel) => rel.type === "manga"
    )?.id;

    if (!mangaId) {
      return NextResponse.json(
        { error: "Manga ID not found for this chapter" },
        { status: 400 }
      );
    }

    // 3. Fetch chapter pages
    const pagesResponse = await axios.get<AtHomeResponse>(
      `https://api.mangadex.org/at-home/server/${chapterId}`
    );
    const pagesData = pagesResponse.data;

    // 4. Fetch all chapters for this specific manga with proper filtering
    const chaptersResponse = await axios.get<ChapterListResponse>(
      `https://api.mangadex.org/chapter`,
      {
        params: {
          manga: mangaId, // Add this filter
          order: { chapter: "desc" },
          translatedLanguage: [
            "en",
            "pt-br",
            "fr",
            "zh",
            "zh-hk",
            "es",
            "es-la",
            "ja-ro",
            "ko-ro",
            "zh-ro",
          ],
          includes: ["manga"],
          limit: 100, // Add limit to avoid too many results
        },
      }
    );

    const chapters = chaptersResponse.data.data;

    // 5. Find current chapter index
    const currentChapterIndex = chapters.findIndex(
      (chap) => chap.id === chapterId
    );

    if (currentChapterIndex === -1) {
      return NextResponse.json(
        { error: "Chapter not found in the manga's chapter list" },
        { status: 404 }
      );
    }

    // 6. Determine next and previous chapters
    const nextChapterId =
      currentChapterIndex > 0 ? chapters[currentChapterIndex - 1].id : null;
    const prevChapterId =
      currentChapterIndex < chapters.length - 1
        ? chapters[currentChapterIndex + 1].id
        : null;

    // 7. Construct final response
    const chapterDetail = {
      ...chapterData,
      pages: pagesData.chapter.data.map(
        (page: string) =>
          `${pagesData.baseUrl}/data/${pagesData.chapter.hash}/${page}`
      ),
      nextChapterId,
      prevChapterId,
    };

    // 8. Set optimized cache headers
    const response = NextResponse.json(chapterDetail);
    response.headers.set(
      "Cache-Control",
      "public, s-maxage=300, stale-while-revalidate=600"
    );

    return response;
  } catch (error) {
    console.error("Error fetching chapter details:", error);
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          error: "Failed to fetch chapter details",
          message: error.message,
          status: error.response?.status,
        },
        { status: error.response?.status || 500 }
      );
    }
    return NextResponse.json(
      { error: "Failed to fetch chapter details" },
      { status: 500 }
    );
  }
}
