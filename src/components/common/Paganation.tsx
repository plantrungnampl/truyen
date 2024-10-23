"use client";
import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { fetchSeasonalManga } from "@/lib/api";
import { PaginationProps } from "@/types/type";
import { Button } from "@/components/ui/button";

const Paganation: React.FC<PaginationProps> = ({ category }) => {
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
