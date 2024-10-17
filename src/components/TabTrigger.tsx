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
