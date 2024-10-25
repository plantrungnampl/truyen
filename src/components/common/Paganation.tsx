"use client";
import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import {
  MangaListAPIResponse,
  MangaListProps,
  PaginationProps,
} from "@/types/type";
import { Button } from "@/components/ui/button";
import axios from "axios";
// import { fetchSeasonalManga } from "../manga/list/MangaList";

const Paganation: React.FC<PaginationProps> = ({ category }) => {
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
  const router = useRouter();

  const handleClick = () => {
    router.push(`/collection/${category}`);
  };
  const queryClient = useQueryClient();

  const handlePrefetch = useCallback(() => {
    queryClient.prefetchQuery({
      queryKey: ["seasonalManga", "mangaList", category],
      queryFn: () => fetchSeasonalManga(1, category),
    });
  }, [queryClient, category]);
  return (
    <div className="flex justify-center items-center space-x-2 mt-4 ">
      <div className="">
        <Button
          variant={"secondary"}
          className="bg-slate-200 w-96 p-2 text-center rounded "
          onClick={handleClick}
          onMouseEnter={handlePrefetch}
        >
          Xem Thêm
        </Button>
      </div>
    </div>
  );
};
export default Paganation;
