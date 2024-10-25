"use client";

import React, { useCallback } from "react";
import {
  useQueryClient,
  useSuspenseInfiniteQuery,
} from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import MangaCarousel from "../manga/list/MangaCarousel";
import Loading from "@/app/loading";

import Error from "../common/Error";
import {
  MangaListAPIResponse,
  MangaListProps,
  PaginationProps,
} from "@/types/type";
import Paganation from "../common/Paganation";
import axios from "axios";
import { fetchMangaDetail } from "../manga/list/MangaList";
const fetchSeasonalManga = async (
  pageParams: number,
  category: string
): Promise<MangaListProps[]> => {
  const { data } = await axios.get<MangaListAPIResponse>(
    `http://localhost:3000/api/mangaList`,
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
};
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
