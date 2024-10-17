"use client";
import React from "react";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { MangaListAPIResponse, MangaListProps } from "@/types/type";

import MangaCarousel from "./MangaCarousel";
import Loading from "@/app/loading";
import Error from "./Error";
import Paganation from "./Paganation";

// Hàm cấu hình axios mặc định để sử dụng chung
const axiosInstance = axios.create({
  baseURL: "/api",
});

export interface PaginationProps {
  category: "popular" | "new" | "trending" | "seasonal";
  fetchNextPage?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean; // Đảm bảo kiểu boolean
}

const MangaList: React.FC<PaginationProps> = ({ category }) => {
  // Hàm fetch dữ liệu manga
  const fetchMangaList = async (
    pageParams: number
  ): Promise<MangaListProps[]> => {
    const { data } = await axiosInstance.get<MangaListAPIResponse>(
      "/mangaList",
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

  // Sử dụng useInfiniteQuery để quản lý dữ liệu phân trang
  const {
    data: mangaList,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
  } = useInfiniteQuery({
    queryKey: ["mangaList", category],
    queryFn: ({ pageParam = 1 }) => fetchMangaList(pageParam),
    getNextPageParam: (lastPage) =>
      lastPage?.length === 20 ? lastPage.length + 1 : undefined,
    refetchOnWindowFocus: false,
    initialPageParam: 1,
  });

  // Nếu đang load dữ liệu, hiển thị Loading
  if (isFetching) return <Loading />;

  // Nếu có lỗi, hiển thị component Error
  if (error) return <Error message={error.message} />;

  // Dữ liệu manga đã được tải
  const mangaListData = mangaList?.pages.flat() ?? [];

  return (
    <div>
      <MangaCarousel mangaList={mangaListData} />
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
