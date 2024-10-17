"use client";

import React, { useCallback } from "react";
import Image from "next/image";
import { Star, BookOpen, Clock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/app/loading";
import Error from "@/components/Error";
import { useParams } from "next/navigation";
import { Response } from "@/types/type";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

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
  const id = params.id;

  const fetchMangaDetail = useCallback(async () => {
    const { data } = await axios.get<Response>(`/api/detailManga`, {
      params: { id },
    });
    return data;
  }, [id]);

  const {
    data: mangaDetail,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["detailManga", id],
    queryFn: fetchMangaDetail,
    retry: 1,
    staleTime: 3000,
    refetchOnWindowFocus: false,
  });
  console.log(mangaDetail);

  const genres = mangaDetail?.data?.attributes?.tags.map(
    (tag) => tag?.attributes?.name?.en
  );

  if (isFetching) return <Loading />;
  if (error) return <Error message={error.message} />;
  if (!mangaDetail) return <Error message="Manga not found" />;

  const author = mangaDetail?.data?.relationships?.find(
    (rel) => rel.type === "author"
  );

  return (
    <motion.main
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="container mx-auto px-4 py-8 mt-16"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div variants={slideUp} className="md:col-span-1">
          <div className="relative aspect-[2/3] w-full max-w-sm mx-auto">
            <Image
              src={`https://uploads.mangadex.org/covers/${
                mangaDetail.data.id
              }/${
                mangaDetail.data.relationships.find(
                  (rel) => rel.type === "cover_art"
                )!.attributes.fileName
              }`}
              alt={mangaDetail.data.attributes.title["ja-ro"] ?? ""}
              fill
              className="object-cover rounded-lg shadow-lg"
            />
          </div>
          <motion.div
            variants={slideUp}
            className="mt-4 flex justify-center space-x-2"
          >
            <Button>Read First Chapter</Button>
            <Button variant="outline">
              <BookOpen className="mr-2 h-4 w-4" /> Add to Library
            </Button>
          </motion.div>
        </motion.div>

        <motion.div variants={slideUp} className="md:col-span-2 space-y-6">
          <motion.div variants={fadeIn}>
            <h1 className="text-3xl font-bold mb-2">
              {mangaDetail.data.attributes.title.en ?? "Du trinh khong"}
            </h1>
            <p className="text-muted-foreground">
              by {author?.attributes.name}
            </p>
          </motion.div>

          <motion.div
            variants={fadeIn}
            className="flex items-center space-x-4 flex-wrap"
          >
            <div className="flex items-center">
              <Star className="text-yellow-400 mr-1 h-5 w-5" />
              <span className="font-semibold">
                {mangaDetail.data.attributes.contentRating}
              </span>
            </div>
            <Badge variant="secondary">
              {mangaDetail.data.attributes.status}
            </Badge>

            {genres?.map((genre: string, index: number) => (
              <motion.div
                key={genre}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Badge variant="outline">{genre}</Badge>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeIn}>
            <h2 className="text-xl font-semibold mb-2">Synopsis</h2>
            <p className="text-muted-foreground">
              {mangaDetail.data.attributes.description.en}
            </p>
          </motion.div>

          <motion.div variants={fadeIn}>
            <h2 className="text-xl font-semibold mb-2">Chapters</h2>
            <ScrollArea className="h-[300px] rounded-md border p-4">
              {mangaDetail.chapters.map((chapter, index: number) => (
                <motion.div
                  key={chapter.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {index > 0 && <Separator className="my-2" />}
                  <div className="flex justify-between items-center py-2">
                    <div>
                      <p className="font-medium">
                        Chapter {chapter.attributes.chapter}:
                        {chapter.attributes.title?.en || "Untitled"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <Clock className="inline mr-1 h-4 w-4" />
                        {new Date(
                          chapter.attributes.readableAt
                        ).toLocaleDateString()}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      Read <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </ScrollArea>
          </motion.div>
        </motion.div>
      </div>
    </motion.main>
  );
}
