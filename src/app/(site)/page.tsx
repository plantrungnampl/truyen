// import React from "react";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// import MangaList from "@/components/MangaList";
// import { Star, TrendingUp, Clock } from "lucide-react";
// import SeasonalMangaList from "@/components/ClientComponet/SeasonalMangaList";

// interface HomeProps {
//   defaultCategory?: "popular" | "new" | "trending" | "seasonal";
//   defaultSeason?: "seasonal";
// }

// const Home: React.FC<HomeProps> = ({
//   defaultCategory = "popular",
//   defaultSeason = "seasonal",
// }) => {
//   return (
//     <div className="container mx-auto px-4 py-8">
//       <Card className="mb-8">
//         <CardHeader>
//           <CardTitle>Explore Manga</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <Tabs defaultValue={defaultCategory}>
//             <TabsList className="grid w-full grid-cols-3 mb-4">
//               <TabsTrigger value="popular">
//                 <Star className="w-4 h-4 mr-2" />
//                 Phổ biến
//               </TabsTrigger>
//               <TabsTrigger value="new">
//                 <Clock className="w-4 h-4 mr-2" />
//                 Mới cập nhật
//               </TabsTrigger>
//               <TabsTrigger value="trending">
//                 <TrendingUp className="w-4 h-4 mr-2" />
//                 Xu hướng
//               </TabsTrigger>
//             </TabsList>
//             <TabsContent value="popular">
//               <MangaList category="popular" />
//             </TabsContent>
//             <TabsContent value="new">
//               <MangaList category="new" />
//             </TabsContent>
//             <TabsContent value="trending">
//               <MangaList category="trending" />
//             </TabsContent>
//           </Tabs>
//         </CardContent>
//       </Card>

//       {/* Recently Manga Section */}
//       <Card className="mb-8">
//         <CardHeader>
//           <CardTitle>Seasonal Manga</CardTitle>
//         </CardHeader>
//         <Tabs defaultValue={defaultSeason}>
//           <TabsList className="">Summer 2024</TabsList>

//           <TabsContent value="seasonal">
//             <SeasonalMangaList category="seasonal" />
//           </TabsContent>
//         </Tabs>
//       </Card>
//     </div>
//   );
// };

// export default Home;
import React from "react";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import MangaList from "@/components/MangaList";
// import { Star, TrendingUp, Clock, LucideIcon } from "lucide-react";
// import SeasonalMangaList from "@/components/ClientComponet/SeasonalMangaList";
// import TabTrigger from "@/components/TabTrigger";
import ExploreSection from "@/components/ExploreSection";
import SeasonalSection from "@/components/SeasonalSection";

// interface HomeProps {
//   defaultCategory?: "popular" | "new" | "trending";
//   defaultSeason?: "seasonal";
// }
export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <ExploreSection />
      <SeasonalSection />
    </div>
  );
}
// export default function Home({
//   defaultCategory = "popular",
//   defaultSeason = "seasonal",
// }: Partial<HomeProps>) {
//   return (
//     <div className="container mx-auto px-4 py-8 space-y-8">
//       <ExploreSection defaultCategory={defaultCategory} />
//       <SeasonalSection defaultSeason={defaultSeason} />
//     </div>
//   );
// }

// function ExploreSection({
//   defaultCategory,
// }: Pick<HomeProps, "defaultCategory">) {
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Khám phá Manga</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <Tabs defaultValue={defaultCategory}>
//           <TabsList className="grid w-full grid-cols-3 mb-4">
//             <TabTrigger value="popular" icon={Star} label="Phổ biến" />
//             <TabTrigger value="new" icon={Clock} label="Mới cập nhật" />
//             <TabTrigger value="trending" icon={TrendingUp} label="Xu hướng" />
//           </TabsList>
//           <TabsContent value="popular">
//             <MangaList category="popular" />
//           </TabsContent>
//           <TabsContent value="new">
//             <MangaList category="new" />
//           </TabsContent>
//           <TabsContent value="trending">
//             <MangaList category="trending" />
//           </TabsContent>
//         </Tabs>
//       </CardContent>
//     </Card>
//   );
// }

// function SeasonalSection({ defaultSeason }: Pick<HomeProps, "defaultSeason">) {
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Manga theo mùa</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <Tabs defaultValue={defaultSeason}>
//           <TabsList className="grid w-full grid-cols-1 mb-4">
//             <TabsTrigger value="seasonal">Mùa hè 2024</TabsTrigger>
//           </TabsList>
//           <TabsContent value="seasonal">
//             <SeasonalMangaList category="seasonal" />
//           </TabsContent>
//         </Tabs>
//       </CardContent>
//     </Card>
//   );
// }

// function TabTrigger({
//   value,
//   icon: Icon,
//   label,
// }: {
//   value: string;
//   icon: LucideIcon;
//   label: string;
// }) {
//   return (
//     <TabsTrigger value={value}>
//       <Icon className="w-4 h-4 mr-2" />
//       {label}
//     </TabsTrigger>
//   );
// }
