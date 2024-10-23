"use client";
import React from "react";
import ExploreSection from "@/components/home/ExploreSection";
import SeasonalSection from "@/components/home/SeasonalSection";

export default function Home() {
  // if (typeof window === "undefined") {
  //   console.log("Rendering on the server");
  // } else {
  //   console.log("Rendering on the client");
  // }
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <ExploreSection />
      <SeasonalSection />
    </div>
  );
}
