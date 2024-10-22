import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const limit = searchParams.get("limit") || "10";
  const page = searchParams.get("page") || "1";
  const offset = (parseInt(page) - 1) * parseInt(limit);

  // Kiểm tra ID có được cung cấp không
  if (!id) {
    return NextResponse.json(
      { error: "Manga ID is required" },
      { status: 400 }
    );
  }

  try {
    // Dùng Promise.all để gọi cả hai API song song
    const [mangaDetailRes, chaptersRes] = await Promise.all([
      axios.get(`https://api.mangadex.org/manga/${id}`, {
        params: {
          includes: ["cover_art", "author", "artist"],
        },
      }),
      axios.get(`https://api.mangadex.org/chapter`, {
        params: {
          manga: id,
          limit,
          offset,
          // order: JSON.stringify({ chapter: "desc" }),
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
        },
      }),
    ]);

    // Xử lý dữ liệu trả về
    // const mangaData = mangaDetailRes.data || [];
    const mangaData = mangaDetailRes?.data?.data || {};

    const totalChapters = chaptersRes?.data?.total || 0;
    const chaptersData = chaptersRes?.data?.data || [];

    // Tạo dữ liệu trả về kết hợp
    const combinedData = {
      data: mangaData,
      chapters: chaptersData,
      total: totalChapters,
    };

    return NextResponse.json(combinedData);
  } catch (err) {
    console.error("Error fetching manga details:", err);
    return NextResponse.json(
      { error: "Failed to fetch manga details" },
      { status: 500 }
    );
  }
}
