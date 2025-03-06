"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import OtpForm from "@/components/forms/otp-form";
import { useAuthStore } from "@/store/authStore";

export default function VerifyOtpPage() {
  const router = useRouter();
  const registrationData = useAuthStore((state) => state.registrationData);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (!registrationData?.email && !isAuthenticated) {
      router.push("/register");
    }
  }, [registrationData, router, isAuthenticated]);

  if (!registrationData?.email || isAuthenticated) {
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <OtpForm />
    </div>
  );
}
