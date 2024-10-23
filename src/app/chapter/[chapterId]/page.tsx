"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Book, ArrowUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Loading from "@/app/loading";
import Error from "@/components/common/Error";
import { ChapterDetailResponse } from "@/types/type";

export default function ChapterDetailContent() {
  const params = useParams();
  const chapterId = params?.chapterId as string;
  const [showBackToTop, setShowBackToTop] = useState(false);
  const fetchChapterDetail = async () => {
    const { data } = await axios.get<ChapterDetailResponse>(
      `/api/chapterDetails`,
      {
        params: { chapterId },
      }
    );
    return data;
  };
  const router = useRouter();
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
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isFetching) return <Loading />;
  if (error || !chapterDetail)
    return (
      <Error
        message={(error as Error)?.message ?? "Failed to load chapter details"}
      />
    );
  const { nextChapterId, prevChapterId } = chapterDetail;
  const onNextChapter = () => {
    if (nextChapterId) {
      router.push(`/chapter/${nextChapterId}`);
    }
  };

  const onPreviousChapter = () => {
    if (prevChapterId) {
      router.push(`/chapter/${prevChapterId}`);
    }
  };

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
          disabled={!chapterDetail.prevChapterId}
          variant="outline"
          size="lg"
          className="w-[200px]"
        >
          <ChevronLeft className="mr-2 h-5 w-5" /> Previous Chapter
        </Button>
        <Button
          onClick={onNextChapter}
          disabled={!chapterDetail?.nextChapterId}
          size="lg"
          className="w-[200px]"
        >
          Next Chapter <ChevronRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
      {showBackToTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 rounded-full p-3"
          size="icon"
        >
          <ArrowUp className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
}
