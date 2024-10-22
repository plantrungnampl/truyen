"use client";
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SeasonalMangaList from "@/components/ClientComponet/SeasonalMangaList";

export default function SeasonalSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Manga theo mùa</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="seasonal">
          <TabsList className="grid w-full grid-cols-1 mb-4">
            <TabsTrigger value="seasonal">Mùa hè 2024</TabsTrigger>
          </TabsList>
          <TabsContent value="seasonal">
            <SeasonalMangaList category="seasonal" />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
