// import axios from "axios";
// import { NextResponse } from "next/server";

// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const id = searchParams.get("id");

//   if (!id) {
//     return NextResponse.json(
//       { error: "Manga ID is required" },
//       { status: 400 }
//     );
//   }

//   try {
//     // Gọi API MangaDex để lấy chi tiết của manga theo ID
//     const mangaDetailRes = await axios.get(
//       `https://api.mangadex.org/manga/${id}`,
//       {
//         params: {
//           includes: ["cover_art", "manga", "author", "artist"], // Bao gồm ảnh bìa
//         },
//       }
//     );

//     const mangaData = mangaDetailRes.data;
//     const chaptersResponse = await axios.get(
//       `https://api.mangadex.org/chapter/${id}`,

//     );
//     const chaptersData = await chaptersResponse.json();
//     return NextResponse.json(mangaData);
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json(
//       { error: "Failed to fetch manga details" },
//       { status: 500 }
//     );
//   }
// }
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Manga ID is required" },
      { status: 400 }
    );
  }

  try {
    // Gọi API MangaDex để lấy chi tiết của manga theo ID
    const mangaDetailRes = await axios.get(
      `https://api.mangadex.org/manga/${id}`,
      {
        params: {
          includes: ["cover_art", "author", "artist"], // Bao gồm ảnh bìa, tác giả và họa sĩ
        },
      }
    );

    const mangaData = mangaDetailRes.data;

    // Gọi API để lấy danh sách chapter
    const chaptersRes = await axios.get(`https://api.mangadex.org/chapter`, {
      params: {
        // translatedLanguage: ["en"],
        manga: id,
        order: { chapter: "desc" },
        translatedLanguage: [
          "en",
          "pt-br",
          "fr",
          "zh",
          "zh-hk",
          "pt-br",
          "es",
          "es-la",
          "ja-ro",
          "ko-ro",
          "zh-ro",
        ],
        includes: ["manga"],
        limit: 100,
        // translatedLanguage: "en",
      },
    });

    const chaptersData = chaptersRes.data;

    // Kết hợp dữ liệu manga và chapters
    const combinedData = {
      data: mangaData.data, //manga
      chapters: chaptersData.data,
    };
    console.log(chaptersRes);

    return NextResponse.json(combinedData);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch manga details" },
      { status: 500 }
    );
  }
}
