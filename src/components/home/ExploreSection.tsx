"use client";
import React from "react";
import { Tabs, TabsList, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MangaList from "@/components/manga/list/MangaList";
import { Star, TrendingUp, Clock } from "lucide-react";
import TabTrigger from "./shared/TabTrigger";

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
// import React from "react";
// import { Tabs, TabsList, TabsContent } from "@/components/ui/tabs";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import MangaList from "@/components/manga/list/MangaList";
// import TabTrigger from "./shared/TabTrigger";

// export default function ExploreSection() {
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Khám phá Manga</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <Tabs defaultValue="popular">
//           <TabsList className="grid w-full grid-cols-3 mb-4">
//             <TabTrigger value="popular" label="Phổ biến" iconName="Star" />
//             <TabTrigger value="new" label="Mới cập nhật" iconName="Clock" />
//             <TabTrigger
//               value="trending"
//               label="Xu hướng"
//               iconName="TrendingUp"
//             />
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
