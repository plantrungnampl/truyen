// import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
// // import MangaList, {
// //   fetchSeasonalManga,
// // } from "@/components/manga/list/MangaList";
// // import { fetchSeasonalManga } from "@/lib/api";
// import { getQueryClient } from "../get-query-client";
// import { Suspense } from "react";
// import Loading from "../loading";
// import { MangaListAPIResponse, MangaListProps } from "@/types/type";
// import axios from "axios";
// import MangaList from "@/components/manga/list/MangaList";
// export type PageProps = {
//   params: Promise<{ category: string }>;
// };

// export default async function MangaListPage({ params }: PageProps) {
//   const fetchSeasonalManga = async (
//     pageParams: number,
//     category: string = "popular"
//   ): Promise<MangaListProps[]> => {
//     const { data } = await axios.get<MangaListAPIResponse>(`/api/mangaList`, {
//       params: {
//         page: pageParams,
//         limit: 20,
//         category: category,
//       },
//     });

//     return data.data.map((manga) => {
//       const cover = manga.relationships.find((rel) => rel.type === "cover_art");
//       return {
//         id: manga.id,
//         title: manga.attributes.title.en || "Unknown Title",
//         description:
//           manga.attributes.description.en || "No description available",
//         coverUrl: cover
//           ? `https://uploads.mangadex.org/covers/${manga.id}/${cover.attributes.fileName}`
//           : "",
//         link: `manga/${manga.id}`,
//       };
//     });
//   };
//   const resolvedParams = await params; // Giải quyết Promise của params
//   const { category } = resolvedParams; // Lấy category từ params đã giải quyết

//   const queryClient = getQueryClient();
//   try {
//     await queryClient.prefetchInfiniteQuery({
//       queryKey: ["mangaList", category],
//       queryFn: ({ pageParam = 1 }) => fetchSeasonalManga(pageParam, category),
//       initialPageParam: 1,
//     });

//     const dehydratedState = dehydrate(queryClient);

//     return (
//       <HydrationBoundary state={dehydratedState}>
//         <Suspense fallback={<Loading />}>
//           <MangaList category={category} />
//         </Suspense>
//       </HydrationBoundary>
//     );
//   } catch (err) {
//     console.log("mamama===", err);
//     return <div>Failed to load manga list. Please try again later.</div>;
//   }

//   // await queryClient.prefetchInfiniteQuery({
//   //   queryKey: ["mangaList", category],
//   //   queryFn: ({ pageParam = 1 }) => fetchSeasonalManga(pageParam, category),
//   //   initialPageParam: 1,
//   // });

//   // const dehydratedState = dehydrate(queryClient);

//   // return (
//   //   <HydrationBoundary state={dehydratedState}>
//   //     <Suspense fallback={<Loading />}>
//   //       <MangaList category={category} />
//   //     </Suspense>
//   //   </HydrationBoundary>
//   // );
// }
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "../get-query-client";
import { Suspense } from "react";
import Loading from "../loading";
import { MangaListAPIResponse, MangaListProps } from "@/types/type";
import axios from "axios";
import MangaList from "@/components/manga/list/MangaList";

// Constants
const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
const MANGA_API_ENDPOINT = "/api/mangaList";

// Types
export type PageProps = {
  // params: { category: string };
  params: Promise<{ category: string }>;
  searchParams?: Promise<{ [key: string]: string | undefined }>;
};

// API function
const fetchSeasonalManga = async (
  pageParams: number,
  category: string = "popular"
): Promise<MangaListProps[]> => {
  try {
    // Construct absolute URL for server-side
    const apiUrl = new URL(MANGA_API_ENDPOINT, BASE_URL).toString();

    const { data } = await axios.get<MangaListAPIResponse>(apiUrl, {
      params: {
        page: pageParams,
        limit: 20,
        category: category,
      },
      // Add headers if needed
      headers: {
        Accept: "application/json",
      },
    });

    if (!data || !data.data) {
      throw new Error("Invalid response format");
    }

    return data.data.map((manga) => {
      const cover = manga.relationships.find((rel) => rel.type === "cover_art");
      return {
        id: manga.id,
        title: manga.attributes.title.en || "Unknown Title",
        description:
          manga.attributes.description.en || "No description available",
        coverUrl: cover
          ? `https://uploads.mangadex.org/covers/${manga.id}/${cover.attributes.fileName}`
          : "/placeholder-image.jpg", // Add a placeholder image
        link: `/manga/${manga.id}`, // Ensure absolute path
      };
    });
  } catch (error: any) {
    console.error("Error fetching manga:", error);
    throw new Error(`Failed to fetch manga: ${error.message}`);
  }
};

export default async function MangaListPage({ params }: PageProps) {
  const categoryPromise = await params;
  const { category } = categoryPromise; // Default to 'popular' if category is undefined
  const queryClient = getQueryClient();

  try {
    await queryClient.prefetchInfiniteQuery({
      queryKey: ["mangaList", category],
      queryFn: ({ pageParam = 1 }) => fetchSeasonalManga(pageParam, category),
      initialPageParam: 1,
    });

    const dehydratedState = dehydrate(queryClient);

    return (
      <HydrationBoundary state={dehydratedState}>
        <Suspense fallback={<Loading />}>
          <MangaList category={category} />
        </Suspense>
      </HydrationBoundary>
    );
  } catch (error) {
    console.error("Error in MangaListPage:", error);

    // Return error component
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-50 border border-red-200 p-4 rounded-md">
          <h2 className="text-red-800 text-lg font-semibold">
            Error Loading Manga List
          </h2>
          <p className="text-red-600">
            Please try again later. If the problem persists, contact support.
          </p>
        </div>
      </div>
    );
  }
}

// Optionally add generateStaticParams if you want to statically generate pages
export async function generateStaticParams() {
  return [
    { category: "popular" },
    { category: "new" },
    { category: "trending" },
    { category: "seasonal" },
  ];
}
