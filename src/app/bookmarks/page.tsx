"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, ChevronRight, Search, Star, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";

export default function MangaBookmark() {
  const [bookmarks, setBookmarks] = useState([
    {
      id: 1,
      title: "One Piece",
      lastRead: "Chapter 1043",
      cover: "/placeholder.svg?height=150&width=100",
    },
    {
      id: 2,
      title: "Naruto",
      lastRead: "Chapter 700",
      cover: "/placeholder.svg?height=150&width=100",
    },
    {
      id: 3,
      title: "Attack on Titan",
      lastRead: "Chapter 139",
      cover: "/placeholder.svg?height=150&width=100",
    },
    {
      id: 4,
      title: "My Hero Academia",
      lastRead: "Chapter 306",
      cover: "/placeholder.svg?height=150&width=100",
    },
    {
      id: 5,
      title: "Demon Slayer",
      lastRead: "Chapter 205",
      cover: "/placeholder.svg?height=150&width=100",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredBookmarks = bookmarks.filter((bookmark) =>
    bookmark.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const removeBookmark = (id: number) => {
    setBookmarks(bookmarks.filter((bookmark) => bookmark.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-4xl font-bold text-purple-800"
      >
        Manga<span className="text-indigo-600">Bookmarks</span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <Input
            className="pl-10"
            placeholder="Search bookmarks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </motion.div>

      <ScrollArea className="h-[calc(100vh-200px)] rounded-lg bg-white p-6 shadow-lg">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBookmarks.map((bookmark, index) => (
            <motion.div
              key={bookmark.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="group relative overflow-hidden rounded-lg bg-purple-100 p-4 shadow-md transition-all hover:bg-purple-200"
            >
              <div className="flex items-start space-x-4">
                <Image
                  fill
                  src={bookmark.cover}
                  alt={`${bookmark.title} cover`}
                  className="h-24 w-16 rounded-md object-cover shadow-sm"
                />
                <div className="flex-grow">
                  <h2 className="text-lg font-semibold text-purple-800">
                    {bookmark.title}
                  </h2>
                  <p className="text-sm text-purple-600">{bookmark.lastRead}</p>
                  <div className="mt-2 flex items-center space-x-2">
                    <Button size="sm" variant="outline" className="text-xs">
                      <BookOpen className="mr-1 h-3 w-3" />
                      Continue
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs">
                      <Star className="mr-1 h-3 w-3" />
                      Favorite
                    </Button>
                  </div>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100"
                  onClick={() => removeBookmark(bookmark.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <ChevronRight className="absolute bottom-2 right-2 h-5 w-5 text-purple-400 opacity-0 transition-opacity group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
