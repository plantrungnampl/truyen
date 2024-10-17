"use client";

import React, { useState, useTransition, useEffect } from "react";
import LoginForm from "./LoginForm";
import { Login as LoginActions } from "./action";
import { useToast } from "@/hooks/use-toast";
import { LoginValues } from "@/validation";
import { AnimatePresence, motion } from "framer-motion";
import TransitionScreen from "@/components/TransitionScreen";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const values: LoginValues = { username, password };
      const { error, success } = await LoginActions(values);
      if (error) {
        setError(error);
        toast({
          title: "Error",
          description: error,
          variant: "destructive",
        });
      } else if (success) {
        setIsTransitioning(true);
        setIsLoggedIn(true);
      }
    });
  };

  useEffect(() => {
    if (isLoggedIn) {
      const timer = setTimeout(() => {
        router.push("/");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500">
      <AnimatePresence mode="wait">
        {!isTransitioning ? (
          <motion.div
            // key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md mx-auto flex-grow"
          >
            <LoginForm
              onSubmit={handleSubmit}
              setUserName={setUserName}
              setPassword={setPassword}
              username={username}
              password={password}
              isPending={isPending}
              error={error}
            />
          </motion.div>
        ) : (
          // <motion.div
          //   key="transition"
          //   initial={{ opacity: 0 }}
          //   animate={{ opacity: 1 }}
          //   exit={{ opacity: 0 }}
          //   transition={{ duration: 0.5 }}
          //   className="w-full max-w-md mx-auto flex-grow"
          // >
          //   <TransitionScreen />
          // </motion.div>

          <TransitionScreen />
        )}
      </AnimatePresence>
    </div>
  );
}
