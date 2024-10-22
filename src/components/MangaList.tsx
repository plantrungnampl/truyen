// "use client";
// import React, { useCallback } from "react";

// import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

// import MangaCarousel from "./MangaCarousel";
// import Loading from "@/app/loading";
// import Error from "./Error";
// import Paganation from "./Paganation";
// import { fetchMangaDetail, fetchSeasonalManga } from "@/lib/api";

// export interface PaginationProps {
//   category: "popular" | "new" | "trending" | "seasonal";
//   fetchNextPage?: () => void;
//   hasNextPage?: boolean;
//   isFetchingNextPage?: boolean;
// }

// const MangaList: React.FC<PaginationProps> = ({ category }) => {
//   const queryClient = useQueryClient();
//   const handlePrefetch = useCallback(
//     (id: string) => {
//       console.log(`Prefetching data for manga with id: ${id}`);
//       queryClient.prefetchQuery({
//         queryKey: ["detailManga", id],
//         queryFn: () => fetchMangaDetail(id),
//       });
//     },
//     [queryClient]
//   );

//   const {
//     data: mangaList,
//     isFetching,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//     error,
//   } = useInfiniteQuery({
//     queryKey: ["mangaList", category],
//     queryFn: ({ pageParam = 1 }) => fetchSeasonalManga(pageParam, category),

//     getNextPageParam: (lastPage) =>
//       lastPage?.length === 20 ? lastPage.length + 1 : undefined,
//     refetchOnWindowFocus: false,
//     initialPageParam: 1,
//   });

//   if (isFetching) return <Loading />;

//   if (error) return <Error message={error.message} />;

//   const mangaListData = mangaList?.pages.flat() ?? [];

//   return (
//     <div>
//       <MangaCarousel
//         handlePrefetch={handlePrefetch}
//         mangaList={mangaListData}
//       />
//       <Paganation
//         category={category}
//         fetchNextPage={fetchNextPage}
//         hasNextPage={hasNextPage ?? false}
//         isFetchingNextPage={isFetchingNextPage}
//       />
//     </div>
//   );
// };

// export default MangaList;
// components/MangaList.tsx (Client Component)

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
import Error from "./Error";
import Paganation from "./Paganation";
import { fetchMangaDetail, fetchSeasonalManga } from "@/lib/api";
import { PaginationProps } from "@/types/type";

const MangaList: React.FC<PaginationProps> = ({ category }) => {
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
