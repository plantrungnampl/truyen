import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { fetchSeasonalManga } from "@/lib/api";
import { getQueryClient } from "../get-query-client";
import SeasonalMangaList from "@/components/home/SeasonalMangaList";
import { PageProps } from "../mangalist/page";
import { Suspense } from "react";
import Loading from "../loading";

export default async function MangaListPage({ params }: PageProps) {
  const paramsPromise = await params;
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
