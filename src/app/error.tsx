"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/public/icon/logo";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 mx-auto space-y-6 text-center bg-white rounded-lg shadow-sm">
        <Logo className="mx-auto size-14" />
        <h1 className="text-2xl font-semibold text-gray-800">
          Oops! Something went wrong
        </h1>
        <p className="text-gray-600">
          We apologize for the inconvenience. An error has occurred.
        </p>
        <div className="pt-6">
          <Button
            className="w-full h-12 text-white bg-primary hover:bg-primary/90"
            onClick={reset}
          >
            Try again
          </Button>
        </div>
        {error.digest && (
          <p className="text-sm text-gray-500">Error ID: {error.digest}</p>
        )}
      </div>
    </div>
  );
}
