import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import MangaList from "@/components/MangaList";
import { fetchSeasonalManga } from "@/lib/api";
import { getQueryClient } from "../get-query-client";
import { PaginationProps } from "@/types/type";

export default async function MangaListPage({ category }: PaginationProps) {
  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["mangaList", category],
    queryFn: ({ pageParam = 1 }) => fetchSeasonalManga(pageParam, category),
    initialPageParam: 1,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <MangaList category={category} />
    </HydrationBoundary>
  );
}
