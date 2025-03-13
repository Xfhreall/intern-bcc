"use client";

import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
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
      </div>
      <div className="w-full p-10 bg-white rounded-lg shadow-lg">
        <div className="max-w-3xl">
          <h2 className="mb-4 text-2xl font-semibold">
            {`Great to see you, ${session?.user.name}! Let's create a cleaner and healthier ocean together!`}
          </h2>
          <p className="text-gray-600">Every small action counts—let&apos;s make waves for a better future!</p>
        </div>
      </div>
    </div>
  );
}
