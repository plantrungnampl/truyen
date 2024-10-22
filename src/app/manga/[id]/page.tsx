"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  Star,
  BookOpen,
  Clock,
  ChevronRight,
  Send,
  Heart,
  Share2,
  Globe,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import Loading from "@/app/loading";
import Error from "@/components/Error";
import { useParams } from "next/navigation";
import { Response } from "@/types/type";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import dynamic from "next/dynamic";
import { formatDate } from "@/utils/formatDate";
const MotionDiv = dynamic(() =>
  import("framer-motion").then((mod) => mod.motion.div)
);

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

const slideUp = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

export default function DetailManga() {
  const params = useParams();
  const id = params?.id;
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      user: "MangaLover",
      text: "This manga is absolutely amazing! The artwork is stunning and the story keeps me on the edge of my seat.",
      avatar: "/placeholder.svg",
    },
    {
      id: 2,
      user: "OtakuGirl",
      text: "I can't get enough of this series. The character development is top-notch!",
      avatar: "/placeholder.svg",
    },
  ]);

  // const fetchMangaDetail = useCallback(
  //   async (pageParam: number) => {
  //     const { data } = await axios.get<Response>(`/api/detailManga`, {
  //       params: {
  //         id,
  //         page: pageParam,
  //         limit: 20,
  //       },
  //     });
  //     console.log("data ==", data);

  //     return data;
  //   },
  //   [id]
  // );
  const fetchMangaDetail = useCallback(
    async (pageParams: number) => {
      try {
        const { data } = await axios.get<Response>(`/api/detailManga`, {
          params: {
            id,
            page: pageParams,
            limit: 20,
          },
        });
        if (!data) {
          console.warn("No data received, returning empty object");
          // return { data: {}, chapters: [], total: 0 };
        }
        console.log("Manga detail fetched:", data);
        return data;
      } catch (error) {
        console.error("Error fetching manga detail:", error);
        // return { data: {}, chapters: [], total: 0 };
        // throw error;
      }
    },
    [id]
  );
  const {
    data: mangaDetail,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    isLoading,
  } = useInfiniteQuery({
    queryFn: ({ pageParam = 1 }) => fetchMangaDetail(pageParam),
    queryKey: ["detailManga", "mangaList", id],
    retry: 3,
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || !allPages) {
        return undefined;
      }
      if (!lastPage.chapters || !Array.isArray(lastPage.chapters)) {
        return undefined;
      }
      const totalChaptersFetched = allPages
        .flat()
        // .filter((page) => page && page?.chapters)
        .reduce((sum, page) => sum + (page?.chapters?.length || 0), 0);

      return totalChaptersFetched < lastPage?.total
        ? allPages?.length + 1
        : undefined;
    },

    initialPageParam: 1,
    staleTime: 60000,
  });
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const mangaListData = useMemo(
    () => mangaDetail?.pages?.flat() ?? [],
    [mangaDetail]
  );
  console.log("mangaListData ===", mangaListData);

  // const mangaListData = mangaDetail?.pages?.flat() || [];

  const genres = useMemo(
    () =>
      mangaListData[0]?.data?.attributes?.tags?.map(
        (tag) => tag?.attributes?.name?.en
      ) || [],
    [mangaListData]
  );

  const author = useMemo(
    () =>
      mangaListData[0]?.data?.relationships?.find(
        (rel) => rel.type === "author"
      ),
    [mangaListData]
  );
  console.log(author);

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      setComments([
        ...comments,
        {
          id: comments.length + 1,
          user: "CurrentUser",
          text: comment,
          avatar: "/placeholder.svg",
        },
      ]);
      setComment("");
    }
  };

  const translateLanguages = useMemo(
    () =>
      mangaListData[0]?.data?.attributes?.availableTranslatedLanguages?.map(
        (lang) => lang?.trim()
      ) || [],
    [mangaListData]
  );

  const coverImage = mangaListData[0]?.data?.relationships?.find(
    (rel) => rel.type === "cover_art"
  )?.attributes?.fileName;

  const title =
    mangaListData[0]?.data?.attributes?.title["en"] || "No Title Available";
  const description =
    mangaListData[0]?.data?.attributes?.description["en"] ??
    "No Description Available";
  // const readableAtDate = chapter?.attributes?.readableAt;
  // const formattedDate = formatDate(readableAtDate);
  if ((status === "pending" && !isFetchingNextPage) || !mangaListData.length) {
    return <Loading />;
  }
  if (status === "error" || !mangaListData || !mangaListData.length) {
    return <Error message="Không tìm thấy dữ liệu hoặc lỗi xảy ra." />;
  }
  if (!mangaListData?.length) return <Error message="Manga not found" />;
  if (!mangaListData || !mangaListData.length) {
    return <Error message="Không tìm thấy manga." />;
  }
  if (isLoading) return <Loading />;
  return (
    <motion.main
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="container mx-auto px-4 py-8 mt-16"
    >
      <Card className="overflow-hidden">
        <div className="relative h-64 md:h-96 ">
          {coverImage && (
            <Image
              src={`https://uploads.mangadex.org/covers/${mangaListData[0]?.data?.id}/${coverImage}`}
              alt={title}
              fill
              className="object-cover blur-sm"
            />
          )}
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end">
            <div className="container mx-auto px-4 py-6 flex items-end space-x-6">
              <div className="relative w-32 h-48 md:w-48 md:h-72 flex-shrink-0">
                {coverImage ? (
                  <Image
                    src={`https://uploads.mangadex.org/covers/${mangaListData[0]?.data?.id}/${coverImage}`}
                    alt={title}
                    fill
                    className="object-cover rounded-lg shadow-lg"
                  />
                ) : (
                  <div className="bg-gray-200 rounded-lg shadow-lg w-full h-full"></div>
                )}
              </div>
              <div className="flex-grow">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {title}
                </h1>
                <p className="text-xl text-gray-300 mb-4">
                  by {author?.attributes?.name ?? "Unknown Author"}
                </p>
                <div className="flex items-center space-x-4 flex-wrap">
                  <div className="flex items-center bg-yellow-400 rounded-full px-3 py-1">
                    <Star className="text-white mr-1 h-5 w-5" />
                    <span className="font-semibold text-white">
                      {mangaListData[0]?.data?.attributes?.contentRating ??
                        "No Rating"}
                    </span>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-primary text-primary-foreground"
                  >
                    {mangaListData[0]?.data?.attributes.status ??
                      "Unknown Status"}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
        <CardContent className="p-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="chapters">Chapters</TabsTrigger>
              <TabsTrigger value="comments">Comments</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <MotionDiv variants={slideUp} className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold mb-2">Synopsis</h2>
                  <p className="text-muted-foreground">{description}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    {genres?.map((genre, index) => (
                      <motion.div
                        key={genre}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Badge variant="outline">{genre}</Badge>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="flex space-x-4">
                  <Button className="flex-1">
                    <BookOpen className="mr-2 h-4 w-4" /> Read First Chapter
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Heart className="mr-2 h-4 w-4" /> Add to Library
                  </Button>
                  <Button variant="outline">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </MotionDiv>
            </TabsContent>
            <TabsContent value="chapters">
              <ScrollArea className="h-[400px] rounded-md border p-4">
                {mangaListData?.map((page, pageIndex) => (
                  <div key={pageIndex}>
                    {page?.chapters?.map((chapter, index) => (
                      <motion.div
                        key={chapter?.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        {index > 0 && <Separator className="my-2" />}
                        <div className="flex justify-between items-center py-2">
                          <div>
                            <p className="font-medium">
                              Chapter {chapter?.attributes?.chapter}:
                              {chapter?.attributes?.title?.en || "Untitled"}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              <Clock className="inline mr-1 h-4 w-4" />
                              {/* {new Date(
                                chapter?.attributes?.readableAt
                              ).toLocaleDateString()} */}
                              {formatDate(chapter?.attributes?.readableAt)}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              <Globe className="inline mr-1 h-4 w-4" />
                              {chapter?.attributes?.translatedLanguage}
                            </p>
                          </div>
                          <Link href={`/chapter/${chapter?.id}`}>
                            <Button variant="ghost" size="sm">
                              Read <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ))}
                <div
                  className="w-full flex justify-center items-center"
                  ref={ref}
                >
                  {isFetchingNextPage ? (
                    <Button
                      disabled
                      className="bg-primary text-primary-foreground"
                    >
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
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="languages">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold mb-2">
                  Available Translated Languages
                </h3>
                <div className="flex flex-wrap gap-2">
                  {translateLanguages.map((lang, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Badge variant="secondary">
                        <Globe className="mr-1 h-4 w-4" />
                        {lang}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="comments">
              <div className="space-y-4">
                <AnimatePresence>
                  {comments.map((comment, index) => (
                    <motion.div
                      key={comment.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-start space-x-4">
                        <Avatar>
                          <AvatarImage
                            src={comment.avatar}
                            alt={comment.user}
                          />
                          <AvatarFallback>{comment.user[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-semibold">{comment.user}</p>
                          <p className="text-sm text-muted-foreground">
                            {comment.text}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div className="mt-4 flex items-start space-x-4">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" alt="CurrentUser" />
                    <AvatarFallback>CU</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      placeholder="Add a comment..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="mb-2"
                    />
                    <Button onClick={handleCommentSubmit}>
                      <Send className="mr-2 h-4 w-4" /> Post Comment
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.main>
  );
}
