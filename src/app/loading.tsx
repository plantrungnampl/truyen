"use client";

import { motion } from "framer-motion";

const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const loadingCircleVariants = {
  start: {
    y: "0%",
  },
  end: {
    y: ["0%", "100%", "0%"],
  },
};

const loadingCircleTransition = {
  duration: 1,
  repeat: Infinity,
  ease: "easeInOut",
};

const loadingTextVariants = {
  start: { opacity: 0.5 },
  end: { opacity: 1 },
};

const loadingTextTransition = {
  duration: 0.5,
  repeat: Infinity,
  // repeatType: "reverse",

  ease: "easeInOut",
};

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center mt-16 ">
      <motion.div
        className="flex justify-center items-center mb-8"
        variants={loadingContainerVariants}
        initial="start"
        animate="end"
      >
        {[0, 1, 2, 3, 4].map((index) => (
          <motion.span
            key={index}
            className="w-4 h-4 bg-gray-600 rounded-full mx-1"
            variants={loadingCircleVariants}
            transition={{
              ...loadingCircleTransition,
              delay: index * 0.1,
            }}
          />
        ))}
      </motion.div>
      <motion.p
        className="text-black text-2xl font-bold"
        variants={loadingTextVariants}
        initial="start"
        animate="end"
        transition={loadingTextTransition}
        // transition={loadingTextTransition}
      >
        Đang tải...
      </motion.p>
    </div>
  );
}
