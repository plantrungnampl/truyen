import { MangaListAPIResponse, MangaListProps } from "@/types/type";
import axios from "axios";
// const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
export const fetchSeasonalManga = async (
  pageParams: number,
  category: string
): Promise<MangaListProps[]> => {
  const { data } = await axios.get<MangaListAPIResponse>(
    "http://localhost:3000/api/mangaList",
    {
      params: {
        page: pageParams,
        limit: 20,
        category: category,
      },
    }
  );
  console.log(data);

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

// manga detail
export const fetchMangaDetail = async (id: string) => {
  const { data } = await axios.get(`http://localhost:3000/api/detailManga`, {
    params: { id },
  });
  return data;
};
// maanfaadetail rel

export const fetchMangaDetail12 = async (id: string, pageParams: number) => {
  try {
    const { data } = await axios.get<Response>(`/api/detailManga`, {
      params: {
        id,
        page: pageParams,
        limit: 20,
      },
    });

    if (!data) {
      console.warn("No data received, returning empty object");
      // return { data: {}, chapters: [], total: 0 };
    }

    console.log("Manga detail fetched:", data);
    return data;
  } catch (error) {
    console.error("Error fetching manga detail:", error);
    // return { data: {}, chapters: [], total: 0 };
    // throw error;
  }
};
