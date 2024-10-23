// // import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
// // import MangaList from "@/components/manga/list/MangaList";
// // import { fetchSeasonalManga } from "@/lib/api";
// // import { getQueryClient } from "../get-query-client";
// // import { PaginationProps } from "@/types/type";
// // type MangaListPageProps = {
// //   category: PaginationProps["category"];
// // };
// // export default async function MangaListPage({ category }: MangaListPageProps) {
// //   const queryClient = getQueryClient();

// //   await queryClient.prefetchInfiniteQuery({
// //     queryKey: ["mangaList", category],
// //     queryFn: ({ pageParam = 1 }) => fetchSeasonalManga(pageParam, category),
// //     initialPageParam: 1,
// //   });

// //   const dehydratedState = dehydrate(queryClient);

// //   return (
// //     <HydrationBoundary state={dehydratedState}>
// //       <MangaList category={category} />
// //     </HydrationBoundary>
// //   );
// // }
// // app/mangalist/page.tsx
// import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
// import MangaList from "@/components/manga/list/MangaList";
// import { fetchSeasonalManga } from "@/lib/api";
// import { getQueryClient } from "../get-query-client";
// import { PaginationProps } from "@/types/type";

// interface PageProps {
//   params: {
//     category: PaginationProps["category"];
//   };
//   searchParams: { [key: string]: string | undefined };
// }

// export default async function MangaListPage({ params }: PageProps) {
//   const { category } = params;

//   const queryClient = getQueryClient();

//   await queryClient.prefetchInfiniteQuery({
//     queryKey: ["mangaList", category],
//     queryFn: ({ pageParam = 1 }) => fetchSeasonalManga(pageParam, category),
//     initialPageParam: 1,
//   });

//   const dehydratedState = dehydrate(queryClient);

//   return (
//     <HydrationBoundary state={dehydratedState}>
//       <MangaList category={category} />
//     </HydrationBoundary>
//   );
// }
// app/mangalist/page.tsx

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import MangaList from "@/components/manga/list/MangaList";
import { fetchSeasonalManga } from "@/lib/api";
import { getQueryClient } from "../get-query-client";
import { Metadata } from "next";
import { PageProps } from "@/types/type";

// Xử lý generateMetadata
export async function generateMetadata({
  category,
}: PageProps): Promise<Metadata> {
  return {
    title: `Manga List - ${category}`,
  };
}

// Xử lý generateStaticParams
export async function generateStaticParams() {
  return [
    { category: "popular" },
    { category: "new" },
    { category: "trending" },
    { category: "seasonal" },
  ];
}

// Component chính
export default async function MangaListPage({ category }: PageProps) {
  // const { category } = params;

  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["mangaList", category],
    queryFn: ({ pageParam = 1 }) => fetchSeasonalManga(pageParam, category),
    initialPageParam: 1,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <MangaList category={category} />
    </HydrationBoundary>
  );
}
