import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { fetchSeasonalManga } from "@/lib/api";
import { getQueryClient } from "../get-query-client";
import SeasonalMangaList from "@/components/home/SeasonalMangaList";
import { PaginationProps } from "@/types/type";

export default async function MangaListPage({ category }: PaginationProps) {
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
      <SeasonalMangaList category={category} />
    </HydrationBoundary>
  );
}
