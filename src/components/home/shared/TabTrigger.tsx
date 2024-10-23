"use client";
import React from "react";
import { TabsTrigger } from "@/components/ui/tabs";
import { LucideIcon } from "lucide-react";

interface TabTriggerProps {
  value: string;
  icon: LucideIcon;
  label: string;
}

export default function TabTrigger({
  value,
  icon: Icon,
  label,
}: TabTriggerProps) {
  return (
    <TabsTrigger value={value}>
      <Icon className="w-4 h-4 mr-2" />
      {label}
    </TabsTrigger>
  );
}
// "use client"; // TabTrigger sẽ là Client Component vì cần sử dụng LucideIcon
// import React from "react";
// import { TabsTrigger } from "@/components/ui/tabs";
// import { Star, TrendingUp, Clock } from "lucide-react"; // Sử dụng trực tiếp icon từ lucide-react

// interface TabTriggerProps {
//   value: string;
//   label: string;
//   iconName: string; // Truyền tên icon dưới dạng string
// }

// export default function TabTrigger({
//   value,
//   label,
//   iconName,
// }: TabTriggerProps) {
//   // Sử dụng icon dựa trên tên truyền vào
//   const Icon =
//     iconName === "Star" ? Star : iconName === "Clock" ? Clock : TrendingUp;

//   return (
//     <TabsTrigger value={value}>
//       <Icon className="w-4 h-4 mr-2" />
//       {label}
//     </TabsTrigger>
//   );
// }
