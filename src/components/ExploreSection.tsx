"use client";
import React from "react";
import { Tabs, TabsList, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MangaList from "@/components/MangaList";
import { Star, TrendingUp, Clock } from "lucide-react";
import TabTrigger from "./TabTrigger";

export default function ExploreSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Khám phá Manga</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="popular">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabTrigger value="popular" icon={Star} label="Phổ biến" />
            <TabTrigger value="new" icon={Clock} label="Mới cập nhật" />
            <TabTrigger value="trending" icon={TrendingUp} label="Xu hướng" />
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
      </CardContent>
    </Card>
  );
}
