import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import MangaList from "@/components/manga/list/MangaList";
import { fetchSeasonalManga } from "@/lib/api";
import { getQueryClient } from "../get-query-client";
import { Suspense } from "react";
import Loading from "../loading";
export type PageProps = {
  params: Promise<{ category: string }>;
};

export default async function MangaListPage({ params }: PageProps) {
  const resolvedParams = await params; // Giải quyết Promise của params

  const { category } = resolvedParams; // Lấy category từ params đã giải quyết

  const queryClient = getQueryClient();
  try {
    await queryClient.prefetchInfiniteQuery({
      queryKey: ["mangaList", category],
      queryFn: ({ pageParam = 1 }) => fetchSeasonalManga(pageParam, category),
      initialPageParam: 1,
    });

    const dehydratedState = dehydrate(queryClient);

    return (
      <HydrationBoundary state={dehydratedState}>
        <Suspense fallback={<Loading />}>
          <MangaList category={category} />
        </Suspense>
      </HydrationBoundary>
    );
  } catch (err) {
    console.log("mamama===", err);
    return <div>Failed to load manga list. Please try again later.</div>;
  }

  // await queryClient.prefetchInfiniteQuery({
  //   queryKey: ["mangaList", category],
  //   queryFn: ({ pageParam = 1 }) => fetchSeasonalManga(pageParam, category),
  //   initialPageParam: 1,
  // });

  // const dehydratedState = dehydrate(queryClient);

  // return (
  //   <HydrationBoundary state={dehydratedState}>
  //     <Suspense fallback={<Loading />}>
  //       <MangaList category={category} />
  //     </Suspense>
  //   </HydrationBoundary>
  // );
}
