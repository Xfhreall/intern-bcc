import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Logo } from "@/public/icon/logo";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 mx-auto space-y-6 text-center bg-white rounded-lg shadow-xl">
        <Logo className="mx-auto size-14" />
        <h1 className="text-2xl font-semibold text-gray-800">
          {"404 - Page Not Found :("}
        </h1>
        <p className="text-gray-600">
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <div className="pt-6">
          <Button
            asChild
            className="w-full h-12 bg-[#0077b6] hover:bg-[#0077b6]/90 text-white"
          >
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
