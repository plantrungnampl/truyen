const MANGADEX_API = "https://api.mangadex.org";
interface SearchMangaParams {
  title: string;
  limit: string;
  includes: string[];
}

function createSearchParams(params: SearchMangaParams): URLSearchParams {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => {
        searchParams.append(`${key}[]`, item);
      });
    } else {
      searchParams.append(key, value);
    }
  });

  return searchParams;
}
export async function searchManga(query: string) {
  const params: SearchMangaParams = {
    title: query,
    limit: "10",
    includes: ["cover_art"],
  };
  const searchParams = createSearchParams(params);
  const url = `${MANGADEX_API}/manga?${searchParams}`;
  console.log("Fetching URL:", url);

  const response = await fetch(url);

  if (!response.ok) {
    const errorMessage = await response.json();
    throw new Error(errorMessage.error || "Failed to fetch manga");
  }

  const data = await response.json();
  return data;
}

export function getCoverImage(mangaId: string, coverArt: any) {
  // Đảm bảo coverArt có thuộc tính filename
  if (coverArt && coverArt.filename) {
    return `https://uploads.mangadex.org/covers/${mangaId}/${coverArt.filename}`;
  }
  return "/placeholder.jpg"; // Đường dẫn ảnh mặc định nếu không có ảnh bìa
}
