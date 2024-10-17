"use client";

// import { User } from "@prisma/client";
// import { User } from "@prisma/client";
import { Session } from "lucia";
import React, { createContext, useContext } from "react";
interface User {
  id: string;
  username?: string; // Dấu `?` nghĩa là thuộc tính này là tùy chọn
  email?: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface SessionContext {
  user: User | null;
  session: Session;
}

const SessionContext = createContext<SessionContext | null>(null);
export default function SessionProvider({
  children,
  value,
}: React.PropsWithChildren<{ value: SessionContext }>) {
  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}
export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw Error("useSession must be used within a SessionProvider");
  }
  return context;
};
