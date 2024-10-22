"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Clock, LucideIcon, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import Filter from "./Filter";

type SidebarItem = {
  icon: LucideIcon;
  label: string;
  href: string;
};

const Sidebar: React.FC = () => {
  const router = useRouter();

  const sidebarItems: SidebarItem[] = [
    { icon: TrendingUp, label: "Trending", href: `/collection/trending` },
    { icon: Star, label: "Popular", href: `/collection/popular` },
    { icon: Clock, label: "New Releases", href: `/collection/new` },
    { icon: BookOpen, label: "Library", href: `/library` },
  ];

  const containerVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.aside
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="hidden lg:block w-64 sticky left-0 top-16 bottom-0 bg-card border-r overflow-hidden"
    >
      <ScrollArea className="h-full py-6 relative">
        <motion.div variants={itemVariants} className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Category
          </h2>
          <div className="space-y-1">
            {sidebarItems.map((item, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Button
                  variant="ghost"
                  className="w-full justify-start relative overflow-hidden group"
                  onClick={() => router.push(item.href)}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <Separator className="my-4" />
        <motion.div variants={itemVariants} className="px-3 py-2">
          <Filter />
        </motion.div>
      </ScrollArea>
    </motion.aside>
  );
};

export default Sidebar;
