// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { motion } from "framer-motion";
// import { Search, Menu, X, BookOpen, Home, Bookmark, User } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { useSession } from "@/app/(site)/sessionProvider";

// export default function Navbar() {
//   const { user } = useSession();

//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const router = useRouter();

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
//     }
//   };

//   const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

//   const navItems = [
//     { name: "Home", href: "/", icon: Home },
//     { name: "Browse", href: "/browse", icon: BookOpen },
//     { name: "Bookmarks", href: "/bookmarks", icon: Bookmark },
//     { name: "Profile", href: "/profile", icon: User },
//   ];

//   return (
//     <nav className="bg-white shadow-md">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           <div className="flex items-center">
//             <Link href="/" className="flex-shrink-0">
//               <BookOpen className="h-8 w-8 text-purple-600" />
//             </Link>
//             <div className="hidden md:block ml-10">
//               <div className="flex items-baseline space-x-4">
//                 {navItems.map((item) => (
//                   <Link
//                     key={item.name}
//                     href={item.href}
//                     className="text-gray-600 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
//                   >
//                     {item.name}
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           </div>
//           <div className="hidden md:flex items-center space-x-4">
//             <form onSubmit={handleSearch} className="flex items-center">
//               <Input
//                 type="text"
//                 placeholder="Search manga..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-64 mr-2"
//               />
//               <Button type="submit" size="sm">
//                 <Search className="h-4 w-4" />
//               </Button>
//             </form>
//             {user && (
//               <span className="text-gray-600 font-medium">
//                 Welcome, {user.username}
//               </span>
//             )}
//           </div>
//           <div className="md:hidden flex items-center">
//             <Button variant="ghost" size="sm" onClick={toggleMenu}>
//               {isMenuOpen ? (
//                 <X className="h-6 w-6" />
//               ) : (
//                 <Menu className="h-6 w-6" />
//               )}
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile menu */}
//       <motion.div
//         initial={false}
//         animate={isMenuOpen ? "open" : "closed"}
//         variants={{
//           open: { opacity: 1, height: "auto" },
//           closed: { opacity: 0, height: 0 },
//         }}
//         transition={{ duration: 0.3 }}
//         className="md:hidden overflow-hidden"
//       >
//         <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//           {navItems.map((item) => (
//             <Link
//               key={item.name}
//               href={item.href}
//               className="text-gray-600 hover:text-purple-600 block px-3 py-2 rounded-md text-base font-medium"
//             >
//               <item.icon className="inline-block h-5 w-5 mr-2" />
//               {item.name}
//             </Link>
//           ))}
//         </div>
//         <div className="px-2 pt-2 pb-3">
//           <form onSubmit={handleSearch} className="flex items-center">
//             <Input
//               type="text"
//               placeholder="Search manga..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="flex-grow mr-2"
//             />
//             <Button type="submit" size="sm">
//               <Search className="h-4 w-4" />
//             </Button>
//           </form>
//           {user && (
//             <div className="mt-3 px-3 py-2 text-gray-600 font-medium">
//               Welcome, {user.username}
//             </div>
//           )}
//         </div>
//       </motion.div>
//     </nav>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Moon,
  Sun,
  Search,
  Menu,
  X,
  BookOpen,
  Home,
  Bookmark,
  User,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { useSession } from "@/app/(site)/sessionProvider";
import { Avatar } from "./ui/avatar";
import { useQueryClient } from "@tanstack/react-query";
import { logout } from "@/app/(auth)/action";

export default function Navbar() {
  const { user } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => setMounted(true), []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    // { name: "Browse", href: "/browse", icon: BookOpen },
    { name: "Bookmarks", href: "/bookmarks", icon: Bookmark },
  ];

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <BookOpen className="h-8 w-8 text-primary" />
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-muted-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    <item.icon className="inline-block h-4 w-4 mr-2" />
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="flex items-center">
              <Input
                type="text"
                placeholder="Search manga..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 mr-2"
              />
              <Button type="submit" size="icon">
                <Search className="h-4 w-4" />
              </Button>
            </form>
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              >
                {theme === "light" ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </Button>
            )}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="default"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Welcome, {user.username}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => {
                      queryClient.clear();
                      logout();
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="outline">Sign In</Button>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="sm" onClick={toggleMenu}>
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-muted-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
              >
                <item.icon className="inline-block h-5 w-5 mr-2" />
                {item.name}
              </Link>
            ))}
          </div>
          <div className="px-2 pt-2 pb-3">
            <form onSubmit={handleSearch} className="flex items-center">
              <Input
                type="text"
                placeholder="Search manga..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow mr-2"
              />
              <Button type="submit" size="sm">
                <Search className="h-4 w-4" />
              </Button>
            </form>
            <div className="mt-3 flex justify-between items-center">
              {user ? (
                <span className="text-muted-foreground font-medium">
                  Welcome, {user.username}
                </span>
              ) : (
                <Button variant="outline" className="w-full">
                  Sign In
                </Button>
              )}
              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                  className="ml-2"
                >
                  {theme === "light" ? (
                    <Moon className="h-5 w-5" />
                  ) : (
                    <Sun className="h-5 w-5" />
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
