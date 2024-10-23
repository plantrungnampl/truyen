"use client";
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { MangaListProps } from "@/types/type";

interface MangaCardProps {
  manga?: MangaListProps;
}

export default function MangaCard({ manga }: MangaCardProps) {
  if (!manga) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        Manga information is not available.
      </div>
    );
  }

  const truncateDescription = (description: string, length: number) => {
    return description?.length > length
      ? description.substring(0, length) + "..."
      : description;
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="h-full"
    >
      <Card className="flex flex-col h-full overflow-hidden">
        <CardHeader className="p-3 sm:p-4">
          <CardTitle className="text-base sm:text-lg font-semibold line-clamp-1">
            {manga?.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col p-3 sm:p-4 space-y-2">
          {manga?.coverUrl ? (
            <div className="relative w-full pt-[150%] rounded-md overflow-hidden">
              <Image
                src={manga.coverUrl}
                alt={manga.title}
                fill
                priority={true}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ) : (
            <div className="w-full pt-[150%] bg-muted flex items-center justify-center rounded-md">
              <span className="text-xs sm:text-sm text-muted-foreground">
                No Image Available
              </span>
            </div>
          )}
          <p className="text-xs sm:text-sm flex-grow line-clamp-4 sm:line-clamp-3">
            {truncateDescription(manga?.description, 120)}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
