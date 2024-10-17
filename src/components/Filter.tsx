"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Filter as FilterIcon } from "lucide-react";

const genres = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Fantasy",
  "Horror",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Slice of Life",
];

const statuses = ["Ongoing", "Completed", "Hiatus"];

export default function Filter() {
  const [selectedGenres, setSelectedGenres] = React.useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = React.useState<string[]>([]);
  const [yearRange, setYearRange] = React.useState([
    1990,
    new Date().getFullYear(),
  ]);

  const handleGenreChange = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const handleYearChange = (value: number[]) => {
    setYearRange(value);
  };

  const handleApplyFilters = () => {
    console.log("Applied filters:", {
      selectedGenres,
      selectedStatuses,
      yearRange,
    });
    // Here you would typically update the main content based on these filters
  };

  return (
    <div className="bg-card rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <FilterIcon className="mr-2 h-5 w-5" />
        Filters
      </h2>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="genres">
          <AccordionTrigger>Genres</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {genres.map((genre) => (
                <div key={genre} className="flex items-center">
                  <Checkbox
                    id={`genre-${genre}`}
                    checked={selectedGenres.includes(genre)}
                    onCheckedChange={() => handleGenreChange(genre)}
                  />
                  <label
                    htmlFor={`genre-${genre}`}
                    className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {genre}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="status">
          <AccordionTrigger>Status</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {statuses.map((status) => (
                <div key={status} className="flex items-center">
                  <Checkbox
                    id={`status-${status}`}
                    checked={selectedStatuses.includes(status)}
                    onCheckedChange={() => handleStatusChange(status)}
                  />
                  <label
                    htmlFor={`status-${status}`}
                    className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {status}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="year">
          <AccordionTrigger>Publication Year</AccordionTrigger>
          <AccordionContent>
            <Slider
              min={1990}
              max={new Date().getFullYear()}
              step={1}
              value={yearRange}
              onValueChange={handleYearChange}
              className="mt-2"
            />
            <div className="flex justify-between mt-2 text-sm text-muted-foreground">
              <span>{yearRange[0]}</span>
              <span>{yearRange[1]}</span>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Button onClick={handleApplyFilters} className="w-full mt-4">
        Apply Filters
      </Button>
    </div>
  );
}
// "use client";

// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Slider } from "@/components/ui/slider";
// import { Button } from "@/components/ui/button";
// import { Filter as FilterIcon, X } from "lucide-react";

// const genres = [
//   "Action",
//   "Adventure",
//   "Comedy",
//   "Drama",
//   "Fantasy",
//   "Horror",
//   "Mystery",
//   "Romance",
//   "Sci-Fi",
//   "Slice of Life",
// ];

// const statuses = ["Ongoing", "Completed", "Hiatus"];

// export default function Filter() {
//   const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
//   const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
//   const [yearRange, setYearRange] = useState([1990, new Date().getFullYear()]);
//   const [isOpen, setIsOpen] = useState(false);

//   const handleGenreChange = (genre: string) => {
//     setSelectedGenres((prev) =>
//       prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
//     );
//   };

//   const handleStatusChange = (status: string) => {
//     setSelectedStatuses((prev) =>
//       prev.includes(status)
//         ? prev.filter((s) => s !== status)
//         : [...prev, status]
//     );
//   };

//   const handleYearChange = (value: number[]) => {
//     setYearRange(value);
//   };

//   const handleApplyFilters = () => {
//     console.log("Applied filters:", {
//       selectedGenres,
//       selectedStatuses,
//       yearRange,
//     });
//     setIsOpen(false);
//   };

//   const handleClearFilters = () => {
//     setSelectedGenres([]);
//     setSelectedStatuses([]);
//     setYearRange([1990, new Date().getFullYear()]);
//   };

//   return (
//     <>
//       <motion.button
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         className="fixed bottom-4 left-4 z-50 bg-primary text-primary-foreground rounded-full p-3 shadow-lg"
//         onClick={() => setIsOpen(true)}
//       >
//         <FilterIcon className="h-6 w-6" />
//       </motion.button>

//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, x: -300 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: -300 }}
//             transition={{ type: "spring", damping: 25, stiffness: 120 }}
//             className="fixed inset-y-0 left-0 w-[256px] bg-background shadow-2xl p-6 overflow-y-auto z-50"
//           >
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-2xl font-bold flex items-center">
//                 <FilterIcon className="mr-2 h-6 w-6" />
//                 Filters
//               </h2>
//               <motion.button
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//                 onClick={() => setIsOpen(false)}
//               >
//                 <X className="h-6 w-6" />
//               </motion.button>
//             </div>

//             <Accordion type="single" collapsible className="w-full space-y-4">
//               <AccordionItem value="genres" className="border-b-0">
//                 <AccordionTrigger className="text-lg font-semibold">
//                   Genres
//                 </AccordionTrigger>
//                 <AccordionContent>
//                   <motion.div layout className="grid grid-cols-2 gap-2">
//                     {genres.map((genre) => (
//                       <motion.div
//                         key={genre}
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: -20 }}
//                         transition={{ duration: 0.2 }}
//                         className="flex items-center space-x-2"
//                       >
//                         <Checkbox
//                           id={`genre-${genre}`}
//                           checked={selectedGenres.includes(genre)}
//                           onCheckedChange={() => handleGenreChange(genre)}
//                         />
//                         <label
//                           htmlFor={`genre-${genre}`}
//                           className="text-sm font-medium leading-none cursor-pointer"
//                         >
//                           {genre}
//                         </label>
//                       </motion.div>
//                     ))}
//                   </motion.div>
//                 </AccordionContent>
//               </AccordionItem>

//               <AccordionItem value="status" className="border-b-0">
//                 <AccordionTrigger className="text-lg font-semibold">
//                   Status
//                 </AccordionTrigger>
//                 <AccordionContent>
//                   <motion.div layout className="space-y-2">
//                     {statuses.map((status) => (
//                       <motion.div
//                         key={status}
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: -20 }}
//                         transition={{ duration: 0.2 }}
//                         className="flex items-center space-x-2"
//                       >
//                         <Checkbox
//                           id={`status-${status}`}
//                           checked={selectedStatuses.includes(status)}
//                           onCheckedChange={() => handleStatusChange(status)}
//                         />
//                         <label
//                           htmlFor={`status-${status}`}
//                           className="text-sm font-medium leading-none cursor-pointer"
//                         >
//                           {status}
//                         </label>
//                       </motion.div>
//                     ))}
//                   </motion.div>
//                 </AccordionContent>
//               </AccordionItem>

//               <AccordionItem value="year" className="border-b-0">
//                 <AccordionTrigger className="text-lg font-semibold">
//                   Publication Year
//                 </AccordionTrigger>
//                 <AccordionContent>
//                   <Slider
//                     min={1990}
//                     max={new Date().getFullYear()}
//                     step={1}
//                     value={yearRange}
//                     onValueChange={handleYearChange}
//                     className="mt-4"
//                   />
//                   <div className="flex justify-between mt-2 text-sm text-muted-foreground">
//                     <span>{yearRange[0]}</span>
//                     <span>{yearRange[1]}</span>
//                   </div>
//                 </AccordionContent>
//               </AccordionItem>
//             </Accordion>

//             <div className="mt-8 space-y-4">
//               <Button onClick={handleApplyFilters} className="w-full">
//                 Apply Filters
//               </Button>
//               <Button
//                 onClick={handleClearFilters}
//                 variant="outline"
//                 className="w-full"
//               >
//                 Clear Filters
//               </Button>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {isOpen && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.2 }}
//           className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
//           onClick={() => setIsOpen(false)}
//         />
//       )}
//     </>
//   );
// }
