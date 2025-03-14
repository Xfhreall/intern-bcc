"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { HeaderDashboard } from "@/components/ui/header-dashboard";
export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [session]);

  return (
    <section className="flex flex-col w-full">
      <HeaderDashboard />
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
    </section>
  );
}
