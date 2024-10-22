// "use client";

// import { useEffect } from "react";

// type ErrorProps = {
//   error: Error & { digest?: string };
//   reset: () => void;
// };

// export default function Error({ error, reset }: ErrorProps) {
//   useEffect(() => {
//     console.error("Error occurred:", error);
//   }, [error]);

//   return (
//     <div style={{ padding: "20px", textAlign: "center", color: "red" }}>
//       <h2>Something went wrong!</h2>
//       {error?.message && (
//         <p style={{ color: "darkred" }}>Error: {error.message}</p>
//       )}
//       <button
//         onClick={reset}
//         style={{ padding: "10px 20px", marginTop: "20px", cursor: "pointer" }}
//       >
//         Try again
//       </button>
//     </div>
//   );
// }
"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Error occurred:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-red-600 flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 mr-2 animate-pulse" />
            Something went wrong!
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          {error?.message && (
            <p className="text-sm text-gray-600 mt-2 mb-4">{error.message}</p>
          )}
          {error?.digest && (
            <p className="text-xs text-gray-500 mt-1">
              Error ID: {error.digest}
            </p>
          )}
          <div className="mt-6 text-sm text-gray-600">
            <p>
              We apologize for the inconvenience. Our team has been notified and
              is working on a solution.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            onClick={reset}
            className="bg-red-600 hover:bg-red-700  font-semibold py-2 px-4 rounded-lg transition-colors duration-300 ease-in-out"
          >
            Try again
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
