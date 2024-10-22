"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center p-4 overflow-hidden">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-2xl w-full bg-white rounded-lg shadow-2xl overflow-hidden"
        >
          <div className="p-8 relative">
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="flex justify-center mb-8"
            >
              <BookOpen className="h-24 w-24 text-purple-600" />
            </motion.div>
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-4xl font-bold text-center text-gray-800 mb-4"
            >
              Oops! Page Not Found
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-center text-gray-600 mb-8"
            >
              It seems the page you&apos;re looking for has vanished into thin
              air, just like a ninja in a manga!
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
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
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.8, delay: 1, times: [0, 0.8, 1] }}
              className="absolute top-4 right-4 w-16 h-16 bg-pink-500 rounded-full"
            />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.8, delay: 1.2, times: [0, 0.8, 1] }}
              className="absolute bottom-4 left-4 w-12 h-12 bg-purple-500 rounded-full"
            />
          </div>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="bg-gray-100 p-6 relative overflow-hidden"
          >
            <p className="text-center text-gray-600 text-sm relative z-10">
              &quot;In the world of manga, every ending is just a new beginning.
              Let&apos;s start your next adventure!&quot;
            </p>
            <motion.div
              animate={{
                x: ["0%", "100%"],
                y: ["0%", "100%"],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear",
              }}
              className="absolute inset-0 bg-gradient-to-br from-purple-200 to-pink-200 opacity-30"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
