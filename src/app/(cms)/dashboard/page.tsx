"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Snippet } from "@heroui/snippet";

import { LogoutButton } from "@/components/ui/logout-button";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }

    const timeout = setTimeout(() => {
      setIsReady(true);
      if (typeof window !== "undefined") {
        setAccessToken(localStorage.getItem("accessToken") || "");
        setRefreshToken(localStorage.getItem("refreshToken") || "");
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, [status, router]);

  if (!isReady || status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen w-svw">
        Loading...
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  return (
    <div className="w-full p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <LogoutButton />
      </div>

      <div className="w-full p-6 bg-white rounded-lg">
        <h2 className="mb-4 text-xl font-semibold">
          Welcome, {session?.user?.name}!
        </h2>
        <p className="text-gray-600">You are now logged in to your account.</p>

        <div className="p-4 mt-4 rounded-md bg-gray-50">
          <h3 className="font-medium">Your Profile:</h3>
          <ul className="mt-2 space-y-1">
            <li>Email: {session?.user?.email}</li>
          </ul>
        </div>

        <div className="p-4 mt-4 rounded-md bg-gray-50">
          <h3 className="font-medium">Your Tokens:</h3>
          <div className="mt-2 space-y-2">
            <div>
              <p className="font-medium">Access Token:</p>
              <Snippet className="p-2 overflow-x-auto text-xs bg-gray-100 rounded whitespace-nowrap">
                {accessToken}
              </Snippet>
            </div>
            <div>
              <p className="font-medium">Refresh Token:</p>
              <Snippet className="p-2 overflow-x-auto text-xs bg-gray-100 rounded whitespace-nowrap">
                {refreshToken}
              </Snippet>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
