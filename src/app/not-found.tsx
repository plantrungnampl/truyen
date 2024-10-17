"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, Home, Search } from "lucide-react";

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-2xl overflow-hidden">
        <div className="p-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <BookOpen className="h-24 w-24 text-purple-600" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl font-bold text-center text-gray-800 mb-4"
          >
            Oops! Page Not Found
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-center text-gray-600 mb-8"
          >
            It seems the page you&apos;re looking for has vanished into thin
            air, just like a ninja in a manga!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <Link href="/">
              <Button className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white">
                <Home className="mr-2 h-4 w-4" /> Return Home
              </Button>
            </Link>
            <Link href="/search">
              <Button
                variant="outline"
                className="w-full sm:w-auto border-purple-600 text-purple-600 hover:bg-purple-100"
              >
                <Search className="mr-2 h-4 w-4" /> Search Manga
              </Button>
            </Link>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="bg-gray-100 p-6"
        >
          <p className="text-center text-gray-600 text-sm">
            &quot;In the world of manga, every ending is just a new beginning.
            Let&apos;s start your next adventure!&quot;
          </p>
        </motion.div>
      </div>
    </div>
  );
}
