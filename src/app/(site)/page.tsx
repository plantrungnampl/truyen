"use client";
import React from "react";
import ExploreSection from "@/components/ExploreSection";
import SeasonalSection from "@/components/SeasonalSection";
// import dynamic from "next/dynamic";
// const ExploreSection = dynamic(() => import("@/components/ExploreSection"));
// const SeasonalSection = dynamic(() => import("@/components/SeasonalSection"));
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
