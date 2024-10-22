"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { MangaListAPIResponse, MangaListProps } from "@/types/type";
import Loading from "@/app/loading";

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const BannerFetch = async (): Promise<MangaListProps[]> => {
    const { data } = await axios.get<MangaListAPIResponse>("/api/mangaList");
    console.log(data);

    return data.data.map((manga) => {
      const cover = manga.relationships.find((rel) => rel.type === "cover_art");
      return {
        id: manga.id,
        title: manga.attributes.title.en || "Unknown Title",
        description:
          manga.attributes.description.en || "No description available",
        coverUrl: cover
          ? `https://uploads.mangadex.org/covers/${manga.id}/${cover.attributes.fileName}`
          : "",
        link: `/manga/${manga.id}`,
      };
    });
  };

  const {
    data: bannerData,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["banner"],
    queryFn: BannerFetch,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!bannerData || bannerData.length === 0) return;

    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % bannerData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [bannerData]);

  const nextSlide = () => {
    if (!bannerData || bannerData.length === 0) return;
    setCurrentSlide((prevSlide) => (prevSlide + 1) % bannerData.length);
  };

  const prevSlide = () => {
    if (!bannerData || bannerData.length === 0) return;
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + bannerData.length) % bannerData.length
    );
  };

  if (isFetching) return <Loading />;
  if (error) return <div>Error loading banner data</div>;
  if (!bannerData || bannerData.length === 0) return null;

  return (
    <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] mt-4 sm:mt-16 max-h-[300px] sm:max-h-[600px] overflow-hidden rounded-lg">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          {/* Background blur */}
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={bannerData[currentSlide].coverUrl}
              alt={bannerData[currentSlide].title}
              fill
              style={{
                objectFit: "cover",
                filter: "blur(20px)",
                transform: "scale(1.1)",
              }}
            />
          </div>

          {/* Main image */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src={bannerData[currentSlide].coverUrl}
              alt={bannerData[currentSlide].title}
              fill
              style={{
                objectFit: "contain",
                objectPosition: "center",
              }}
              priority
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex items-center justify-center">
            <div className="text-center text-white px-4 w-full max-w-4xl">
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4 line-clamp-2 sm:line-clamp-1"
              >
                {bannerData[currentSlide].title}
              </motion.h2>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xs sm:text-sm md:text-base mb-2 sm:mb-4 line-clamp-2 sm:line-clamp-3"
              >
                {bannerData[currentSlide].description}
              </motion.p>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Button
                  asChild
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-1 px-3 sm:py-2 sm:px-4 rounded-full transition duration-300 text-xs sm:text-sm"
                >
                  <a href={bannerData[currentSlide].link}>Read Now</a>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-1 sm:left-4 top-1/2 transform -translate-y-1/2 text-white"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-1 sm:right-4 top-1/2 transform -translate-y-1/2 text-white"
        onClick={nextSlide}
      >
        <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
      </Button>
      <div className="absolute bottom-1 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-2">
        {bannerData.map((_, index) => (
          <button
            key={index}
            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
              index === currentSlide ? "bg-white" : "bg-gray-400"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}
