import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "../get-query-client";
import SeasonalMangaList from "@/components/home/SeasonalMangaList";
import { PageProps } from "../mangalist/page";
import { Suspense } from "react";
import Loading from "../loading";
import { MangaListAPIResponse, MangaListProps } from "@/types/type";
import axios from "axios";
// import { fetchSeasonalManga } from "@/components/manga/list/MangaList";

export default async function MangaListPage({ params }: PageProps) {
  const paramsPromise = await params;
  const fetchSeasonalManga = async (
    pageParams: number,
    category: string = "popular"
  ): Promise<MangaListProps[]> => {
    const { data } = await axios.get<MangaListAPIResponse>(`/api/mangaList`, {
      params: {
        page: pageParams,
        limit: 20,
        category: category,
      },
    });

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
  const { category } = paramsPromise;
  const queryClient = getQueryClient();
  // Prefetch dữ liệu trên server
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["seasonalManga", category],
    queryFn: ({ pageParam = 1 }) => fetchSeasonalManga(pageParam, category),
    initialPageParam: 1,
  });

  // Dehydrate dữ liệu để gửi tới client
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Suspense fallback={<Loading />}>
        <SeasonalMangaList category={category} />
      </Suspense>
    </HydrationBoundary>
  );
}
