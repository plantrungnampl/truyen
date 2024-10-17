"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Star, TrendingUp, Clock } from "lucide-react";
import MangaList from "@/components/MangaList"; // Thành phần client-side tương tác

interface TabsComponentProps {
  defaultCategory: "popular" | "new" | "trending";
}

const TabsComponent: React.FC<TabsComponentProps> = ({ defaultCategory }) => {
  return (
    <Tabs defaultValue={defaultCategory}>
      <TabsList className="grid w-full grid-cols-3 mb-4">
        <TabsTrigger value="popular">
          <Star className="w-4 h-4 mr-2" />
          Phổ biến
        </TabsTrigger>
        <TabsTrigger value="new">
          <Clock className="w-4 h-4 mr-2" />
          Mới cập nhật
        </TabsTrigger>
        <TabsTrigger value="trending">
          <TrendingUp className="w-4 h-4 mr-2" />
          Xu hướng
        </TabsTrigger>
      </TabsList>

      <TabsContent value="popular">
        <MangaList category="popular" />
      </TabsContent>
      <TabsContent value="new">
        <MangaList category="new" />
      </TabsContent>
      <TabsContent value="trending">
        <MangaList category="trending" />
      </TabsContent>
    </Tabs>
  );
};

export default TabsComponent;
