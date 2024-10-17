"use client";

import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import MangaCarousel from "../MangaCarousel";
import Loading from "@/app/loading";

import { MangaListAPIResponse, MangaListProps } from "@/types/type";
import Paganation from "../Paganation";
import axios from "axios";
import { PaginationProps } from "../MangaList";

const SeasonalMangaList: React.FC<PaginationProps> = ({ category }) => {
  const fetchSeasonalManga = async (
    pageParams: number
  ): Promise<MangaListProps[]> => {
    const { data } = await axios.get<MangaListAPIResponse>("/api/mangaList", {
      params: {
        page: pageParams,
        limit: 20,
        category: category,
      },
    });
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
  const {
    data: q,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
  } = useInfiniteQuery({
    queryKey: ["seasonalManga", category],
    queryFn: ({ pageParam = 1 }) => fetchSeasonalManga(pageParam),
    getNextPageParam: (lastPage, allPages) =>
      lastPage?.length === 20 ? allPages.length + 1 : undefined, // Kiểm tra có trang tiếp theo không
    refetchOnWindowFocus: false,
    initialPageParam: 1,
  });
  console.log("q=====", q);

  // Hiển thị loading nếu đang tải dữ liệu
  if (isFetching) return <Loading />;

  // Hiển thị lỗi nếu có
  if (error) {
    return (
      <>
        {/* <Error
          message={
            error instanceof Error
              ? error.message
              : "An unexpected error occurred"
          }
        /> */}
        <p>Tạm thời chưa có dữ liệu</p>
      </>
    );
  }

  const mangaListData = q?.pages.flat() ?? [];

  return (
    <Card>
      <CardContent className="p-6">
        <div>
          <MangaCarousel mangaList={mangaListData ?? []} />
        </div>

        <div>
          <Paganation
            category="seasonal"
            // season="seasonal"
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
