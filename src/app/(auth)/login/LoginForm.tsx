"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { InputField } from "@/components/InputField";
// import { Login as LoginActions } from "./action";
// import { LoginValues } from "@/validation";
import { Alert, AlertDescription } from "@/components/ui/alert";
// import { useToast } from "@/hooks/use-toast";
interface LoginFormProps {
  onSubmit: (e: React.FormEvent) => void;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  username: string;
  password: string;
  isPending: boolean;
  error: string | null;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  setUserName,
  username,
  isPending,
  error,
  password,
  setPassword,
}) => {
  //   const [username, setUserName] = useState("");
  //   const [password, setPassword] = useState("");
  //   const [error, setError] = useState<string | null>(null);
  //   const [isPending, startTransition] = useTransition();
  //   const [isLoggedIn, setIsLoggedIn] = useState(false);
  //   const { toast } = useToast();
  //   const handleSubmit = async (e: React.FormEvent) => {
  //     e.preventDefault();
  //     setError(null);
  //     startTransition(async () => {
  //       const values: LoginValues = { username, password };
  //       const { error } = await LoginActions(values);
  //       if (error) {
  //         setError(error);
  //         toast({
  //           title: "Error",
  //           description: error,
  //           variant: "destructive",
  //         });
  //       } else {
  //         setIsLoggedIn(true);
  //         toast({
  //           title: "Success",
  //           description: "You have successfully logged in!",
  //         });
  //       }
  //     });
  //   };

  return (
    // <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 p-4">
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
        <div className="p-8">
          <motion.h2
            className="text-3xl font-bold text-center mb-8"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Welcome Back
          </motion.h2>
          <form onSubmit={onSubmit} className="space-y-6">
            <InputField
              id="username"
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              icon={Mail}
            />
            <InputField
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={Lock}
            />
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 rounded-md transition duration-300 ease-in-out"
                disabled={isPending}
              >
                {isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="ml-2" size={18} />
                  </>
                )}
              </Button>
            </motion.div>
          </form>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-center text-sm text-gray-600"
          >
            <p>Don&apos;t have an account?</p>
            <Link
              href="/signup"
              className="font-semibold text-purple-600 hover:text-purple-800 transition duration-300 ease-in-out"
            >
              Sign up
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
    // </div>
  );
};
export default LoginForm;
