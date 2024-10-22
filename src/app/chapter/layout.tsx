"use server";
import { validateRequest } from "@/auth";
import Navbar from "@/components/Navbar";
import { redirect } from "next/navigation";
import SessionProvider from "../(site)/sessionProvider";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await validateRequest();
  if (!session.user) redirect("/login");

  return (
    <SessionProvider value={session}>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        {/* <div className="max-w-7xl mx-auto w-full ">
          <Banner />
        </div> */}
        <main className=" transition-all duration-300 ease-in-out bg-slate-200">
          <div className="max-w-7xl mx-auto  py-3 ">{children}</div>
        </main>
      </div>
    </SessionProvider>
  );
}
