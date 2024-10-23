"use client";

import { useInView } from "react-intersection-observer";
import React, { useCallback, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "@/app/loading";
import Error from "@/components/common/Error";
import { MangaListAPIResponse, MangaListProps } from "@/types/type";
import { Button } from "@/components/ui/button";
import { Clock, Loader2, Star, TrendingUp } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { fetchMangaDetail } from "@/lib/api";

const CollectionPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const categories = params.category as "popular" | "new" | "trending";
  // const id = params.id;
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });
  const handlePrefetch = useCallback(
    (id: string) => {
      console.log(`xem them prefetch ${id}`);
      queryClient.prefetchQuery({
        queryKey: [
          "seasonalManga",
          "mangaList",
          "detailManga",
          "mangaCollection",
          id,
        ],
        queryFn: () => fetchMangaDetail(id),
      });
    },
    [queryClient]
  );
  const fetchMangaList = useCallback(
    async (pageParam: number): Promise<MangaListProps[]> => {
      const response = await fetch(
        `/api/mangaList?page=${pageParam}&limit=20&category=${categories}`,
        {
          next: { revalidate: 3600 },
        }
      );
      const data: MangaListAPIResponse = await response.json();

      return data.data.map((manga) => ({
        id: manga.id,
        // title: manga.attributes.title.en || "Unknown Title",
        title:
          manga.attributes.title.en ||
          manga.attributes.altTitles.find((i) => i.fr)?.fr ||
          manga.attributes.altTitles.find((i) => i.it)?.it ||
          manga.attributes.altTitles.find((i) => i["ja-ro"])?.["ja-ro"] ||
          manga.attributes.altTitles.find((i) => i.ja)?.ja ||
          manga.attributes.altTitles.find((i) => i.ru)?.ru ||
          manga.attributes.altTitles.find((i) => i.th)?.th ||
          manga.attributes.altTitles.find((i) => i["zh-hk"])?.["zh-hk"] ||
          "Unknown Title",

        description:
          manga.attributes.description.en ||
          manga.attributes.description.ja ||
          manga.attributes.description.zh ||
          manga.attributes.description.es ||
          manga.attributes.description.fr ||
          manga.attributes.description.ru ||
          manga.attributes.description["pt-br"] ||
          "No description Availble",
        coverUrl: manga.relationships.find((rel) => rel.type === "cover_art")
          ? `https://uploads.mangadex.org/covers/${manga.id}/${
              manga.relationships.find((rel) => rel.type === "cover_art")!
                .attributes.fileName
            }`
          : "",
        tags: manga.attributes.tags.map((tag) => tag.attributes.name.en),
      }));
    },

    [categories]
  );

  const {
    data: mangaList,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    error,
    status,
  } = useInfiniteQuery({
    queryKey: ["mangaCollection", categories],
    queryFn: ({ pageParam = 1 }) => fetchMangaList(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 20) return undefined;
      return allPages.length + 1;
    },
    refetchOnWindowFocus: false,
    staleTime: 3000,
    initialPageParam: 1,
  });

  const mangaListData = useMemo(
    () => mangaList?.pages.flat() ?? [],
    [mangaList]
  );

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (status === "pending" && !isFetchingNextPage) {
    return <Loading />;
  }

  if (status === "error") {
    return <Error message={error.message} />;
  }

  const getCategoryIcon = () => {
    switch (categories) {
      case "popular":
        return <Star className="w-6 h-6 text-yellow-400" />;
      case "trending":
        return <TrendingUp className="w-6 h-6 text-red-500" />;
      case "new":
        return <Clock className="w-6 h-6 text-green-500" />;
      default:
        return null;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };
  const handleMangaClick = (id: string) => {
    router.push(`/manga/${id}`);
  };
  return (
    <motion.div
      className="container mx-auto mt-8 "
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="flex items-center justify-center mb-8 space-x-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {getCategoryIcon()}
        <h1 className="text-4xl font-bold text-primary">
          {categories === "popular"
            ? "Popular Manga"
            : `${
                categories.charAt(0).toUpperCase() + categories.slice(1)
              } Manga`}
        </h1>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        variants={containerVariants}
      >
        <AnimatePresence>
          {mangaListData.map((manga, index) => (
            <motion.div
              key={`${manga.id}-${index}`}
              variants={itemVariants}
              layout
              className="cursor-pointer"
              onClick={() => handleMangaClick(manga.id)}
              onMouseEnter={() => handlePrefetch(manga.id)}
            >
              <motion.div
                className="bg-card text-card-foreground rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative h-[400px]">
                  <Image
                    src={manga.coverUrl}
                    alt={manga.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h2 className="text-xl font-bold text-white mb-2 line-clamp-2">
                      {manga.title}
                    </h2>
                    <div className="flex flex-wrap gap-2 ">
                      {manga?.tags
                        ?.slice(0, 3)
                        ?.map((tag: string, index: number) => (
                          <Badge key={index} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                    </div>
                  </div>
                </div>
                <div className="p-4 flex-grow">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {manga.description}
                  </p>
                </div>
                <div className="p-4 pt-0">
                  <Button variant="outline" className="w-full">
                    Read Now
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <motion.div
        className="mt-12 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        ref={ref}
      >
        {isFetchingNextPage ? (
          <Button disabled className="bg-primary text-primary-foreground">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading more...
          </Button>
        ) : hasNextPage ? (
          <Button
            onClick={() => fetchNextPage()}
            variant="outline"
            className="px-8 py-2"
          >
            Load more
          </Button>
        ) : (
          <p className="text-muted-foreground text-lg font-semibold">
            You&apos;ve reached the end!
          </p>
        )}
      </motion.div>

      {isFetching && !isFetchingNextPage && (
        <motion.div
          className="fixed bottom-4 right-4 bg-primary text-primary-foreground px-6 py-3 rounded-full shadow-lg flex items-center space-x-2"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
        >
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Loading...</span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CollectionPage;
