"use client";
import React, { useCallback } from "react";
// import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
// import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { fetchSeasonalManga } from "@/lib/api";
import { PaginationProps } from "@/types/type";

const Paganation: React.FC<PaginationProps> = ({ category }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/collection/${category}`);
  };
  const queryClient = useQueryClient();

  const handlePrefetch = useCallback(() => {
    console.log(`xem them prefetch ${category}`);
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
