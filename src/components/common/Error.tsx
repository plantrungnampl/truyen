"use client";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

interface ErrorProps {
  message: string;
}

const Error: React.FC<ErrorProps> = ({ message }) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center h-60 text-red-500"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
      >
        <AlertTriangle size={48} />
      </motion.div>
      <motion.p
        className="mt-4 text-lg font-semibold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {message}
      </motion.p>
    </motion.div>
  );
};

export default Error;
