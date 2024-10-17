import React from "react";
import MangaCard from "@/components/MangaCard";
import { MangaListProps } from "@/types/type";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
interface MangaCarouselProps {
  mangaList: MangaListProps[];
}

const MangaCarousel: React.FC<MangaCarouselProps> = ({ mangaList }) => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  return (
    <div className="overflow-hidden flex space-x-4 ">
      <Carousel
        plugins={[plugin.current]}
        className="w-full relative "
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {mangaList.map((manga, index) => (
            <CarouselItem
              className="pl-1 basis-1/3 sm:basis-1/3 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
              key={`${manga.id}-${index}`}
            >
              <Link href={`${manga.link}`}>
                <div className="p-1">
                  <div className="p-1 h-full">
                    <MangaCard manga={manga} />
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex absolute left-2 top-1/2 transform -translate-y-1/2  rounded-full p-2  transition-colors" />
        <CarouselNext className="hidden sm:flex absolute right-2 top-1/2 transform -translate-y-1/2  rounded-full p-2  transition-colors" />
      </Carousel>
    </div>
  );
};

export default MangaCarousel;
