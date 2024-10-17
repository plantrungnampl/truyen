import SessionProvider from "@/app/(site)/sessionProvider";
import { validateRequest } from "@/auth";
import Navbar from "@/components/Navbar";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Search, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Filter from "@/components/Filter"; // Import the new Filter component
import Sidebar from "@/components/Sidebar";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await validateRequest();
  if (!session.user) redirect("/login");

  const footerLinks = [
    { label: "About", href: "#" },
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Contact", href: "#" },
  ];

  return (
    <SessionProvider value={session}>
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />

        <div className="flex-1 flex">
          {/* Sidebar - Fixed on the left */}
          <aside className="hidden lg:block w-64 fixed left-0 top-16 bottom-0 bg-card border-r overflow-hidden">
            <ScrollArea className="h-full py-6">
              <div className="">
                <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                  Browse
                </h2>
                <div className="space-y-1">
                  <Sidebar />
                </div>
              </div>
              <Separator className="my-4" />
            </ScrollArea>
          </aside>

          {/* Main content */}
          <main className="flex-1 overflow-y-auto lg:ml-64">
            {/* Hero Section */}
            <div className="relative h-80 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500">
              <div className="absolute inset-0 bg-black opacity-50"></div>
              <div className="relative z-10 h-full flex items-center justify-center text-white px-4">
                <div className="text-center">
                  <h1 className="text-5xl font-bold mb-4">
                    Welcome to MangaVerse
                  </h1>
                  <p className="text-xl mb-6">
                    Discover, read, and collect your favorite manga
                  </p>
                  <div className="flex justify-center">
                    <Input
                      type="search"
                      placeholder="Search for manga..."
                      className="w-full max-w-md bg-white/10 backdrop-blur-sm text-white placeholder-white/70 border-white/30"
                    />
                    <Button variant="secondary" className="ml-2">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col lg:flex-row">
                <div className="flex-1 lg:pr-8">{children}</div>
              </div>
            </div>
          </main>
        </div>

        {/* Mobile sidebar */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="fixed bottom-4 right-4 lg:hidden z-50 rounded-full w-12 h-12 p-0"
            >
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <ScrollArea className="h-full py-6">
              <div className="px-3 py-2">
                <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                  Browse
                </h2>
                <div className="space-y-1">
                  {/* {sidebarItems.map((item, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.label}
                    </Button>
                  ))} */}
                  <Sidebar />
                </div>
              </div>
              <Separator className="my-4" />
              <div className="px-3 py-2">
                <Filter /> {/* Add the new Filter component here as well */}
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>

        {/* Footer */}
        <footer className="bg-card text-card-foreground border-t mt-auto">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-sm">
                  &copy; 2024 MangaVerse. All rights reserved.
                </p>
              </div>
              <div className="flex space-x-4">
                {footerLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="text-sm hover:underline"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </SessionProvider>
  );
}
