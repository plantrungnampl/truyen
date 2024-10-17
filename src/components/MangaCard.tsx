import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { MangaListProps } from "@/types/type";

interface MangaCardProps {
  manga?: MangaListProps;
}

const MangaCard: React.FC<MangaCardProps> = ({ manga }) => {
  if (!manga) {
    return <div className="p-4">Manga information is not available.</div>;
  }

  const truncateDescription = (description: string, length: number) => {
    return description?.length > length
      ? description.substring(0, length) + "..."
      : description;
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="h-full "
    >
      <Card className=" flex flex-col min-h-[400px] ">
        <CardHeader>
          <CardTitle className="text-lg truncate">{manga.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col ">
          {manga.coverUrl ? (
            <Image
              src={manga.coverUrl}
              alt={manga.title}
              width={200}
              height={300}
              priority={true}
              className="w-full h-48 object-cover rounded-md mb-2"
            />
          ) : (
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-md mb-2">
              <span className="text-sm text-gray-500">No Image Available</span>
            </div>
          )}
          <p className="text-sm flex-grow text-wrap">
            {truncateDescription(manga.description, 90)}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MangaCard;
