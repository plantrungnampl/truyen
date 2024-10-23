"use client";
import React, { useCallback } from "react";
import {
  // useInfiniteQuery,
  useQueryClient,
  useSuspenseInfiniteQuery,
  // useSuspenseInfiniteQuery,
} from "@tanstack/react-query";
import MangaCarousel from "./MangaCarousel";
import Loading from "@/app/loading";
import Error from "../../common/Error";
import { fetchMangaDetail, fetchSeasonalManga } from "@/lib/api";
// import { PaginationProps } from "@/types/type";
import Paganation from "../../common/Paganation";
type Category = "popular" | "new" | "trending" | "seasonal";

interface MangaListProps {
  category: Category;
}
const MangaList: React.FC<MangaListProps> = ({ category }) => {
  const queryClient = useQueryClient();

  const handlePrefetch = useCallback(
    (id: string) => {
      queryClient.prefetchQuery({
        queryKey: ["detailManga", id],
        queryFn: () => fetchMangaDetail(id),
      });
    },
    [queryClient]
  );

  const {
    data: mangaList,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
  } = useSuspenseInfiniteQuery({
    queryKey: ["mangaList", category],
    queryFn: ({ pageParam = 1 }) => fetchSeasonalManga(pageParam, category),
    getNextPageParam: (lastPage) =>
      lastPage?.length === 20 ? lastPage.length + 1 : undefined,
    refetchOnWindowFocus: false,
    initialPageParam: 1,
  });

  if (isFetching) return <Loading />;
  if (error) return <Error message={error.message} />;

  const mangaListData = mangaList?.pages.flat() ?? [];

  return (
    <div>
      <MangaCarousel
        handlePrefetch={handlePrefetch}
        mangaList={mangaListData}
      />
      <Paganation
        category={category}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage ?? false}
        isFetchingNextPage={isFetchingNextPage}
      />
    </div>
  );
};

export default MangaList;
