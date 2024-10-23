import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

export function useMangaDetail(id: string) {
  return useInfiniteQuery({
    queryKey: ["manga", id],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await axios.get(`/api/detailManga`, {
        params: { id, page: pageParam, limit: 20 },
      });
      return data;
    },
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage?.chapters?.length) return undefined;
      const totalFetched = allPages.reduce(
        (sum, page) => sum + (page?.chapters?.length || 0),
        0
      );
      return totalFetched < lastPage.total ? allPages.length + 1 : undefined;
    },
    staleTime: 5 * 60 * 1000,
    initialPageParam: 1,
  });
}
