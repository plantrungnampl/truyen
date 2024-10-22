"use client";

import React from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Book } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Loading from "@/app/loading";
import Error from "@/components/Error";
import { ChapterDetailResponse } from "@/types/type";

export default function ChapterDetailContent() {
  const params = useParams();
  const chapterId = params?.chapterId as string;
  const fetchChapterDetail = async () => {
    const { data } = await axios.get<ChapterDetailResponse>(
      `/api/chapterDetails`,
      {
        params: { chapterId },
      }
    );
    return data;
  };

  const {
    data: chapterDetail,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["chapterId", chapterId],
    queryFn: fetchChapterDetail,
    retry: 1,
    staleTime: 60000,
    refetchOnWindowFocus: false,
  });
  console.log(chapterDetail);

  if (isFetching) return <Loading />;
  if (error || !chapterDetail)
    return (
      <Error
        message={(error as Error)?.message ?? "Failed to load chapter details"}
      />
    );

  const onNextChapter = () => {};

  const onPreviousChapter = () => {};

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 mt-16">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center text-3xl font-bold">
            <Book className="mr-2 h-6 w-6" />
            {chapterDetail.data.attributes.title ?? "Untitled Chapter"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-muted-foreground">
            Volume {chapterDetail.data.attributes.volume}
            Chapter {chapterDetail.data.attributes.chapter}
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-8 mb-8">
        {chapterDetail.pages.map((page: string, index: number) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-0">
              <Image
                width={1000}
                height={1500}
                src={page}
                alt={`Page ${index + 1}`}
                className=" w-full h-auto object-contain"
                // priority={index === 0}
                // priority={true}
                loading="lazy"
              />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <Button
          onClick={onPreviousChapter}
          // disabled={!chapterDetail?.previousChapterId}
          variant="outline"
          size="lg"
          className="w-[200px]"
        >
          <ChevronLeft className="mr-2 h-5 w-5" /> Previous Chapter
        </Button>
        <Button
          onClick={onNextChapter}
          // disabled={!chapterDetail?.nextChapterId}
          size="lg"
          className="w-[200px]"
        >
          Next Chapter <ChevronRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
