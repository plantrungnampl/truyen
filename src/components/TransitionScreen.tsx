"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

export default function TransitionScreen() {
  const [particles, setParticles] = useState<
    { id: number; x: number; y: number; size: number }[]
  >([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 4 + 1,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white opacity-50"
          style={{
            width: particle.size,
            height: particle.size,
            x: particle.x,
            y: particle.y,
          }}
          animate={{
            y: [particle.y, particle.y - 100, particle.y],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center text-white"
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360, 360],
          }}
          transition={{
            duration: 4,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            repeat: Infinity,
          }}
          className="relative"
        >
          <BookOpen className="h-24 w-24 text-white" />
          <motion.div
            className="absolute inset-0 rounded-full bg-white opacity-20"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-8 text-4xl font-bold tracking-tight"
        >
          Đang đi tới thế giới khác...
        </motion.h2>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 1, duration: 1.5, ease: "easeInOut" }}
          className="mt-4 h-1 w-64 bg-white opacity-50"
        />
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-4 text-lg text-gray-200"
        >
          Hãy chuẩn bị cho cuộc phiêu lưu mới
        </motion.p>
      </motion.div>
    </div>
  );
}
