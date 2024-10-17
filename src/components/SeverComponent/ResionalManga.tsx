// "use server";
// import { fetchSeasonalManga } from "@/service/api";
// import {
//   dehydrate,
//   HydrationBoundary,
//   QueryClient,
// } from "@tanstack/react-query";
// import SeasonalMangaList from "../ClientComponet/SeasonalMangaList";

// const ResionalManga = async ({
//   season,
//   year,
// }: {
//   season: string;
//   year: string;
// }) => {
//   const queryClient = new QueryClient();

//   await queryClient.prefetchQuery({
//     queryKey: ["seasonal-manga", season, year],
//     queryFn: () => fetchSeasonalManga(season, year),
//   });

//   const dehydratedState = dehydrate(queryClient);

//   return (
//     <HydrationBoundary state={dehydratedState}>
//       <SeasonalMangaList />
//     </HydrationBoundary>
//   );
// };

// export default ResionalManga;
