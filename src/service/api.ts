import { MangaListAPIResponse, MangaListProps } from "@/types/type";
import { formatDateToMangadexFormat } from "@/utils/formatDate";
import axios from "axios";

// Hàm để tạo ra startDate và endDate dựa trên season và year
export const getSeasonDates = (season: string, year: string) => {
  let startDate: Date, endDate: Date;

  switch (season) {
    case "spring":
      startDate = new Date(`${year}-03-01T00:00:00`);
      endDate = new Date(`${year}-05-31T23:59:59`);
      break;
    case "summer":
      startDate = new Date(`${year}-06-01T00:00:00`);
      endDate = new Date(`${year}-08-31T23:59:59`);
      break;
    case "fall":
      startDate = new Date(`${year}-09-01T00:00:00`);
      endDate = new Date(`${year}-11-30T23:59:59`);
      break;
    case "winter":
      startDate = new Date(`${year}-12-01T00:00:00`);
      endDate = new Date(`${year + 1}-02-28T23:59:59`);
      break;
    default:
      throw new Error("Invalid season");
  }

  return { startDate, endDate };
};

// Hàm fetch dữ liệu manga với tham số season và year động
export const fetchSeasonalManga = async (
  season: string,
  year: string,
  page: number = 1
): Promise<MangaListProps[]> => {
  const { startDate, endDate } = getSeasonDates(season, year);
  const limit = 10;
  const offset = (page - 1) * limit; // Tính offset dựa trên trang hiện tại
  const { data } = await axios.get<MangaListAPIResponse>(
    "https://api.mangadex.org/manga",
    // "api/mangaList",

    {
      params: {
        limit,
        offset: offset, // Trang đầu tiên
        createdAtSince: formatDateToMangadexFormat(startDate), // Format ngày tháng động
        updatedAtSince: formatDateToMangadexFormat(endDate), // Format ngày tháng động
        includes: ["manga", "cover_art"], // Bao gồm thông tin về manga và ảnh bìa
        publicationDemographic: ["shounen"], // Lọc theo loại đối tượng
      },
    }
  );

  return data.data.map((manga) => {
    const cover = manga.relationships.find((rel) => rel.type === "cover_art");
    return {
      id: manga.id,
      title: manga.attributes.title.en || "Unknown Title",
      description:
        manga.attributes.description.en || "No description available",
      coverUrl: cover
        ? `https://uploads.mangadex.org/covers/${manga.id}/${cover.attributes.fileName}`
        : "",
      link: `manga/${manga.id}`,
    };
  });
};
