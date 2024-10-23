"use client";

import React, { useCallback } from "react";
import {
  useQueryClient,
  useSuspenseInfiniteQuery,
} from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import MangaCarousel from "../manga/list/MangaCarousel";
import Loading from "@/app/loading";

import { fetchMangaDetail, fetchSeasonalManga } from "@/lib/api";
import Error from "../common/Error";
import { PaginationProps } from "@/types/type";
import Paganation from "../common/Paganation";
const SeasonalMangaList: React.FC<PaginationProps> = ({ category }) => {
  const {
    data: q,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
  } = useSuspenseInfiniteQuery({
    queryKey: ["seasonalManga", category],
    queryFn: ({ pageParam = 1 }) => fetchSeasonalManga(pageParam, category),
    getNextPageParam: (lastPage, allPages) =>
      lastPage?.length === 20 ? allPages.length + 1 : undefined,
    refetchOnWindowFocus: false,
    initialPageParam: 1,
    staleTime: 60000,
  });
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
  if (isFetching) return <Loading />;

  if (error) {
    return (
      <>
        <Error
          message={
            error instanceof Error
              ? error.message
              : "An unexpected error occurred"
          }
        />
      </>
    );
  }

  const mangaListData = q?.pages.flat() ?? [];

  return (
    <Card>
      <CardContent className="p-6">
        <div>
          <MangaCarousel
            handlePrefetch={handlePrefetch}
            mangaList={mangaListData ?? []}
          />
        </div>

        <div>
          <Paganation
            category={category}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default SeasonalMangaList;
