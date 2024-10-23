import { MangaListAPIResponse, MangaListProps } from "@/types/type";
import axios from "axios";
const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
// export const fetchSeasonalManga = async (
//   pageParams: number,
//   category: string
// ): Promise<MangaListProps[]> => {
//   const { data } = await axios.get<MangaListAPIResponse>(
//     `${apiUrl}/api/mangaList`,
//     {
//       params: {
//         page: pageParams,
//         limit: 20,
//         category: category,
//       },
//     }
//   );

//   return data.data.map((manga) => {
//     const cover = manga.relationships.find((rel) => rel.type === "cover_art");
//     return {
//       id: manga.id,
//       title: manga.attributes.title.en || "Unknown Title",
//       description:
//         manga.attributes.description.en || "No description available",
//       coverUrl: cover
//         ? `https://uploads.mangadex.org/covers/${manga.id}/${cover.attributes.fileName}`
//         : "",
//       link: `manga/${manga.id}`,
//     };
//   });
// };
export const fetchSeasonalManga = async (
  pageParams: number,
  category: string
): Promise<MangaListProps[]> => {
  try {
    const { data } = await axios.get<MangaListAPIResponse>(
      `${apiUrl}/api/mangaList`,
      {
        params: {
          page: pageParams,
          limit: 20,
          category: category,
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
  } catch (error: any) {
    console.error("Error fetching seasonal manga:", error);
    if (error.response && error.response.status === 404) {
      console.warn("Manga list not found:", error);
    } else {
      console.error("Error fetching manga list:", error);
    }
    return []; // Trả về mảng rỗng nếu có lỗi
  }
};

// manga detail
export const fetchMangaDetail = async (id: string) => {
  const { data } = await axios.get(`${apiUrl}/api/detailManga`, {
    params: { id },
  });
  return data;
};
// maanfaadetail rel

export const fetchMangaDetail12 = async (id: string, pageParams: number) => {
  try {
    const { data } = await axios.get<Response>(`${apiUrl}/api/detailManga`, {
      params: {
        id,
        page: pageParams,
        limit: 20,
      },
    });

    if (!data) {
      console.warn("No data received, returning empty object");
      return {};
    }

    return data;
  } catch (error) {
    console.error("Error fetching manga detail:", error);
    return null;
  }
};
