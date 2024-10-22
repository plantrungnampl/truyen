// "use client";

// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { Progress } from "@/components/ui/progress";
// import {
//   BookOpen,
//   Heart,
//   Settings,
//   User,
//   Bell,
//   LogOut,
//   Moon,
//   Sun,
// } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { useSession } from "@/app/(site)/sessionProvider";
// import { useQueryClient } from "@tanstack/react-query";
// import { logout } from "@/app/(auth)/action";

// export default function UserProfile() {
//   const { user } = useSession();
//   console.log(user?.email);

//   const [theme, setTheme] = useState<"light" | "dark">("light");
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     const timer = setTimeout(() => setProgress(33), 500);
//     return () => clearTimeout(timer);
//   }, []);

//   const toggleTheme = () => {
//     setTheme(theme === "light" ? "dark" : "light");
//   };

//   const backgroundVariants = {
//     light: "bg-gradient-to-br from-purple-100 to-pink-100",
//     dark: "bg-gradient-to-br from-gray-900 to-purple-900",
//   };

//   const cardVariants = {
//     light: "bg-white",
//     dark: "bg-gray-800",
//   };

//   const textVariants = {
//     light: "text-gray-800",
//     dark: "text-gray-100",
//   };

//   const tabVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0 },
//   };

//   const contentVariants = {
//     hidden: { opacity: 0, x: -20 },
//     visible: { opacity: 1, x: 0 },
//   };
//   const queryClient = useQueryClient();
//   const mangaItems = [
//     {
//       id: 1,
//       title: "One Piece",
//       chapter: 1042,
//       cover:
//         "https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/2EP14mWkbx9BrS218EbVSo/8baa7f76d3975b9a4637f76d4a4b5c4e/one-piece-cover.jpg",
//     },
//     {
//       id: 2,
//       title: "Naruto",
//       chapter: 700,
//       cover:
//         "https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/3lZjxfKUFPpVeeEJNDLLZ8/9a4b0f35d3d3d0b6d9f8f7f7f7f7f7f7/naruto-cover.jpg",
//     },
//     {
//       id: 3,
//       title: "Attack on Titan",
//       chapter: 139,
//       cover:
//         "https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/1QQf7V2z9JzYxBJwvjKZXX/9a4b0f35d3d3d0b6d9f8f7f7f7f7f7f7/attack-on-titan-cover.jpg",
//     },
//     {
//       id: 4,
//       title: "My Hero Academia",
//       chapter: 362,
//       cover:
//         "https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/7gKjKVgHYH8Yk6QYQ6Y6Qk/9a4b0f35d3d3d0b6d9f8f7f7f7f7f7f7/my-hero-academia-cover.jpg",
//     },
//   ];

//   return (
//     <div
//       className={`min-h-screen p-8 transition-colors duration-500 mt-13 ${backgroundVariants[theme]}`}
//     >
//       <motion.div
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className={`max-w-6xl mx-auto rounded-3xl shadow-2xl overflow-hidden transition-colors duration-500 ${cardVariants[theme]}`}
//       >
//         <div className="md:flex">
//           <motion.div
//             initial={{ x: -100, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ duration: 0.5 }}
//             className="md:w-1/3 bg-gradient-to-b from-purple-400 to-pink-400 p-8"
//           >
//             <motion.div
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               transition={{ duration: 0.5 }}
//               className="text-center"
//             >
//               <Avatar className="w-40 h-40 mx-auto border-4 border-white shadow-lg">
//                 <AvatarImage
//                   src="https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/2EP14mWkbx9BrS218EbVSo/8baa7f76d3975b9a4637f76d4a4b5c4e/avatar.jpg"
//                   alt="User avatar"
//                 />
//                 <AvatarFallback>A</AvatarFallback>
//               </Avatar>
//               <motion.h2
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.2 }}
//                 className="mt-4 text-3xl font-bold text-white"
//               >
//                 {/* Manga Champion */}
//                 {user?.username}
//               </motion.h2>
//               <motion.p
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.3 }}
//                 className="text-purple-100"
//               >
//                 Extraordinaire
//               </motion.p>
//             </motion.div>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.4 }}
//               className="mt-12"
//             >
//               <h3 className="text-xl font-semibold text-white mb-4">
//                 Reading Progress
//               </h3>
//               <Progress value={progress} className="w-full h-3" />
//               <p className="text-sm text-purple-100 mt-2">
//                 {progress}% of library completed
//               </p>
//             </motion.div>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.5 }}
//               className="mt-12"
//             >
//               <h3 className="text-xl font-semibold text-white mb-4">
//                 Achievements
//               </h3>
//               <div className="flex flex-wrap gap-2">
//                 <Badge variant="secondary">Binge Reader</Badge>
//                 <Badge variant="secondary">Manga Sage</Badge>
//                 <Badge variant="secondary">Collector</Badge>
//                 <Badge variant="secondary">Night Owl</Badge>
//               </div>
//             </motion.div>
//           </motion.div>
//           <div className={`md:w-2/3 p-8 ${textVariants[theme]}`}>
//             <div className="flex justify-between items-center mb-8">
//               <div className="flex items-center space-x-2">
//                 <Button variant="outline" size="icon">
//                   <Bell className="h-4 w-4" />
//                 </Button>
//                 <Button variant="outline" size="icon" onClick={toggleTheme}>
//                   {theme === "light" ? (
//                     <Moon className="h-4 w-4" />
//                   ) : (
//                     <Sun className="h-4 w-4" />
//                   )}
//                 </Button>
//               </div>
//             </div>
//             <Tabs defaultValue="reading" className="w-full">
//               <TabsList className="mb-8">
//                 <TabsTrigger value="reading">
//                   <BookOpen className="mr-2 h-4 w-4" /> Reading
//                 </TabsTrigger>
//                 <TabsTrigger value="favorites">
//                   <Heart className="mr-2 h-4 w-4" /> Favorites
//                 </TabsTrigger>
//                 <TabsTrigger value="profile">
//                   <User className="mr-2 h-4 w-4" /> Profile
//                 </TabsTrigger>
//                 <TabsTrigger value="settings">
//                   <Settings className="mr-2 h-4 w-4" /> Settings
//                 </TabsTrigger>
//               </TabsList>
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   variants={contentVariants}
//                   initial="hidden"
//                   animate="visible"
//                   exit="hidden"
//                   transition={{ duration: 0.3 }}
//                 >
//                   <TabsContent value="reading">
//                     <motion.div variants={tabVariants}>
//                       <h3 className="text-2xl font-bold mb-6">
//                         Currently Reading
//                       </h3>
//                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                         {mangaItems.map((manga) => (
//                           <motion.div
//                             key={manga.id}
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                           >
//                             <Card>
//                               <CardContent className="p-0">
//                                 <div className="relative">
//                                   <img
//                                     src={manga.cover}
//                                     alt={manga.title}
//                                     className="w-full h-48 object-cover rounded-t-lg"
//                                   />
//                                   <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
//                                     <h4 className="font-bold text-white">
//                                       {manga.title}
//                                     </h4>
//                                     <p className="text-sm text-gray-300">
//                                       Chapter {manga.chapter}
//                                     </p>
//                                   </div>
//                                 </div>
//                                 <div className="p-4">
//                                   <Progress
//                                     value={Math.random() * 100}
//                                     className="w-full h-2"
//                                   />
//                                   <p className="text-sm mt-2">
//                                     Last read: 2 days ago
//                                   </p>
//                                 </div>
//                               </CardContent>
//                             </Card>
//                           </motion.div>
//                         ))}
//                       </div>
//                     </motion.div>
//                   </TabsContent>
//                   <TabsContent value="favorites">
//                     <motion.div variants={tabVariants}>
//                       <h3 className="text-2xl font-bold mb-6">
//                         Favorite Manga
//                       </h3>
//                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                         {mangaItems.map((manga) => (
//                           <motion.div
//                             key={manga.id}
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                           >
//                             <Card>
//                               <CardContent className="p-0">
//                                 <div className="relative">
//                                   <img
//                                     src={manga.cover}
//                                     alt={manga.title}
//                                     className="w-full h-48 object-cover rounded-t-lg"
//                                   />
//                                   <div className="absolute top-2 right-2">
//                                     <Heart className="h-6 w-6 text-red-500 fill-current" />
//                                   </div>
//                                   <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
//                                     <h4 className="font-bold text-white">
//                                       {manga.title}
//                                     </h4>
//                                     <p className="text-sm text-gray-300">
//                                       Rating: ★★★★☆
//                                     </p>
//                                   </div>
//                                 </div>
//                               </CardContent>
//                             </Card>
//                           </motion.div>
//                         ))}
//                       </div>
//                     </motion.div>
//                   </TabsContent>
//                   <TabsContent value="profile">
//                     <motion.div variants={tabVariants}>
//                       <h3 className="text-2xl font-bold mb-6">User Profile</h3>
//                       <Card>
//                         <CardContent className="p-6">
//                           <div className="space-y-4">
//                             <div>
//                               <label className="text-sm font-medium">
//                                 Username
//                               </label>
//                               <input
//                                 type="text"
//                                 className="w-full p-2 mt-1 border rounded cursor-not-allowed"
//                                 // defaultValue="MangaChampion"
//                                 defaultValue={user?.username}
//                                 disabled
//                               />
//                             </div>
//                             <div>
//                               <label className="text-sm font-medium">
//                                 Email
//                               </label>
//                               <input
//                                 type="email"
//                                 className="w-full p-2 mt-1 border rounded cursor-not-allowed"
//                                 // defaultValue="manga@example.com"
//                                 defaultValue={
//                                   user?.email ?? "Error can not get email"
//                                 }
//                                 // value={user?.email}
//                                 disabled
//                               />
//                             </div>
//                             <div>
//                               <label className="text-sm font-medium">Bio</label>
//                               <textarea
//                                 className="w-full p-2 mt-1 border rounded"
//                                 rows={4}
//                                 defaultValue="Passionate manga reader and collector. Always looking for the next great series!"
//                               />
//                             </div>
//                             <Button>Update Profile</Button>
//                           </div>
//                         </CardContent>
//                       </Card>
//                     </motion.div>
//                   </TabsContent>
//                   <TabsContent value="settings">
//                     <motion.div variants={tabVariants}>
//                       <h3 className="text-2xl font-bold mb-6">
//                         Account Settings
//                       </h3>
//                       <Card>
//                         <CardContent className="p-6">
//                           <div className="space-y-4">
//                             <div className="flex items-center justify-between">
//                               <span className="text-sm font-medium">
//                                 Notifications
//                               </span>
//                               <Button variant="outline" size="sm">
//                                 Manage
//                               </Button>
//                             </div>
//                             <div className="flex items-center justify-between">
//                               <span className="text-sm font-medium">
//                                 Privacy
//                               </span>
//                               <Button variant="outline" size="sm">
//                                 Update
//                               </Button>
//                             </div>
//                             <div className="flex items-center justify-between">
//                               <span className="text-sm font-medium">
//                                 Connected Accounts
//                               </span>
//                               <Button variant="outline" size="sm">
//                                 Manage
//                               </Button>
//                             </div>
//                             <div className="pt-4">
//                               <Button
//                                 onClick={() => {
//                                   queryClient.clear();
//                                   logout();
//                                 }}
//                                 variant="destructive"
//                               >
//                                 <LogOut className="mr-2 h-4 w-4" /> Logout
//                               </Button>
//                             </div>
//                           </div>
//                         </CardContent>
//                       </Card>
//                     </motion.div>
//                   </TabsContent>
//                 </motion.div>
//               </AnimatePresence>
//             </Tabs>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Heart,
  Settings,
  User,
  Bell,
  LogOut,
  Moon,
  Sun,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSession } from "@/app/(site)/sessionProvider";
import { useQueryClient } from "@tanstack/react-query";
import { logout } from "@/app/(auth)/action";
import Image from "next/image";

export default function UserProfile() {
  const { user } = useSession();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [progress, setProgress] = useState(0);
  const queryClient = useQueryClient();

  useEffect(() => {
    const timer = setTimeout(() => setProgress(33), 500);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const backgroundVariants = {
    light: "bg-gradient-to-br from-purple-100 to-pink-100",
    dark: "bg-gradient-to-br from-gray-900 to-purple-900",
  };

  const cardVariants = {
    light: "bg-white",
    dark: "bg-gray-800",
  };

  const textVariants = {
    light: "text-gray-800",
    dark: "text-gray-100",
  };

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const contentVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  const mangaItems = [
    {
      id: 1,
      title: "One Piece",
      chapter: 1042,
      cover:
        "https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/2EP14mWkbx9BrS218EbVSo/8baa7f76d3975b9a4637f76d4a4b5c4e/one-piece-cover.jpg",
    },
    {
      id: 2,
      title: "Naruto",
      chapter: 700,
      cover:
        "https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/3lZjxfKUFPpVeeEJNDLLZ8/9a4b0f35d3d3d0b6d9f8f7f7f7f7f7f7/naruto-cover.jpg",
    },
    {
      id: 3,
      title: "Attack on Titan",
      chapter: 139,
      cover:
        "https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/1QQf7V2z9JzYxBJwvjKZXX/9a4b0f35d3d3d0b6d9f8f7f7f7f7f7f7/attack-on-titan-cover.jpg",
    },
    {
      id: 4,
      title: "My Hero Academia",
      chapter: 362,
      cover:
        "https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/7gKjKVgHYH8Yk6QYQ6Y6Qk/9a4b0f35d3d3d0b6d9f8f7f7f7f7f7f7/my-hero-academia-cover.jpg",
    },
  ];

  return (
    <div
      className={`min-h-screen p-4 sm:p-8 transition-colors duration-500 ${backgroundVariants[theme]}`}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`max-w-6xl mx-auto rounded-3xl shadow-2xl overflow-hidden transition-colors duration-500 ${cardVariants[theme]}`}
      >
        <div className="flex flex-col md:flex-row">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-1/3 bg-gradient-to-b from-purple-400 to-pink-400 p-6 sm:p-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <Avatar className="w-24 h-24 sm:w-40 sm:h-40 mx-auto border-4 border-white shadow-lg">
                <AvatarImage
                  src="https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/2EP14mWkbx9BrS218EbVSo/8baa7f76d3975b9a4637f76d4a4b5c4e/avatar.jpg"
                  alt="User avatar"
                />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-4 text-2xl sm:text-3xl font-bold text-white"
              >
                {user?.username}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-purple-100"
              >
                Extraordinaire
              </motion.p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-8 sm:mt-12"
            >
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">
                Reading Progress
              </h3>
              <Progress value={progress} className="w-full h-3" />
              <p className="text-sm text-purple-100 mt-2">
                {progress}% of library completed
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 sm:mt-12"
            >
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">
                Achievements
              </h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Binge Reader</Badge>
                <Badge variant="secondary">Manga Sage</Badge>
                <Badge variant="secondary">Collector</Badge>
                <Badge variant="secondary">Night Owl</Badge>
              </div>
            </motion.div>
          </motion.div>
          <div className={`w-full md:w-2/3 p-6 sm:p-8 ${textVariants[theme]}`}>
            <div className="flex justify-between items-center mb-6 sm:mb-8">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon">
                  <Bell className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={toggleTheme}>
                  {theme === "light" ? (
                    <Moon className="h-4 w-4" />
                  ) : (
                    <Sun className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            <Tabs defaultValue="reading" className="w-full">
              <TabsList className="mb-6 sm:mb-8 flex flex-wrap">
                <TabsTrigger value="reading" className="flex-grow">
                  <BookOpen className="mr-2 h-4 w-4" /> Reading
                </TabsTrigger>
                <TabsTrigger value="favorites" className="flex-grow">
                  <Heart className="mr-2 h-4 w-4" /> Favorites
                </TabsTrigger>
                <TabsTrigger value="profile" className="flex-grow">
                  <User className="mr-2 h-4 w-4" /> Profile
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex-grow">
                  <Settings className="mr-2 h-4 w-4" /> Settings
                </TabsTrigger>
              </TabsList>
              <AnimatePresence mode="wait">
                <motion.div
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  transition={{ duration: 0.3 }}
                >
                  <TabsContent value="reading">
                    <motion.div variants={tabVariants}>
                      <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
                        Currently Reading
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        {mangaItems.map((manga) => (
                          <motion.div
                            key={manga.id}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Card>
                              <CardContent className="p-0">
                                <div className="relative">
                                  <Image
                                    src={manga.cover}
                                    alt={manga.title}
                                    className="w-full h-36 sm:h-48 object-cover rounded-t-lg"
                                  />
                                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black to-transparent">
                                    <h4 className="font-bold text-white text-sm sm:text-base">
                                      {manga.title}
                                    </h4>
                                    <p className="text-xs sm:text-sm text-gray-300">
                                      Chapter {manga.chapter}
                                    </p>
                                  </div>
                                </div>
                                <div className="p-3 sm:p-4">
                                  <Progress
                                    value={Math.random() * 100}
                                    className="w-full h-2"
                                  />
                                  <p className="text-xs sm:text-sm mt-2">
                                    Last read: 2 days ago
                                  </p>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </TabsContent>
                  <TabsContent value="favorites">
                    <motion.div variants={tabVariants}>
                      <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
                        Favorite Manga
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        {mangaItems.map((manga) => (
                          <motion.div
                            key={manga.id}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Card>
                              <CardContent className="p-0">
                                <div className="relative">
                                  <Image
                                    src={manga.cover}
                                    alt={manga.title}
                                    className="w-full h-36 sm:h-48 object-cover rounded-t-lg"
                                  />
                                  <div className="absolute top-2 right-2">
                                    <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-red-500 fill-current" />
                                  </div>
                                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black to-transparent">
                                    <h4 className="font-bold text-white text-sm sm:text-base">
                                      {manga.title}
                                    </h4>
                                    <p className="text-xs sm:text-sm text-gray-300">
                                      Rating: ★★★★☆
                                    </p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </TabsContent>
                  <TabsContent value="profile">
                    <motion.div variants={tabVariants}>
                      <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
                        User Profile
                      </h3>
                      <Card>
                        <CardContent className="p-4 sm:p-6">
                          <div className="space-y-4">
                            <div>
                              <label className="text-sm font-medium">
                                Username
                              </label>
                              <input
                                type="text"
                                className="w-full p-2 mt-1 border rounded cursor-not-allowed"
                                defaultValue={user?.username}
                                disabled
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium">
                                Email
                              </label>

                              <input
                                type="email"
                                className="w-full p-2 mt-1 border rounded cursor-not-allowed"
                                defaultValue={
                                  user?.email ?? "Error can not get email"
                                }
                                disabled
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium">Bio</label>
                              <textarea
                                className="w-full p-2 mt-1 border rounded"
                                rows={4}
                                defaultValue="Passionate manga reader and collector. Always looking for the next great series!"
                              />
                            </div>
                            <Button className="w-full sm:w-auto">
                              Update Profile
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </TabsContent>
                  <TabsContent value="settings">
                    <motion.div variants={tabVariants}>
                      <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
                        Account Settings
                      </h3>
                      <Card>
                        <CardContent className="p-4 sm:p-6">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">
                                Notifications
                              </span>
                              <Button variant="outline" size="sm">
                                Manage
                              </Button>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">
                                Privacy
                              </span>
                              <Button variant="outline" size="sm">
                                Update
                              </Button>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">
                                Connected Accounts
                              </span>
                              <Button variant="outline" size="sm">
                                Manage
                              </Button>
                            </div>
                            <div className="pt-4">
                              <Button
                                onClick={() => {
                                  queryClient.clear();
                                  logout();
                                }}
                                variant="destructive"
                                className="w-full sm:w-auto"
                              >
                                <LogOut className="mr-2 h-4 w-4" /> Logout
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </TabsContent>
                </motion.div>
              </AnimatePresence>
            </Tabs>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
