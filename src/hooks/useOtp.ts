"use client";

import type React from "react";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { addToast } from "@heroui/toast";

import { useAuthStore } from "@/store/authStore";
import { VerifyOtpResponse } from "@/types/authTypes";
import { internalApi } from "@/lib/axios";

export const useOtp = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");

  const registrationData = useAuthStore((state) => state.registrationData);
  const clearRegistrationData = useAuthStore(
    (state) => state.clearRegistrationData
  );
  const setTokens = useAuthStore((state) => state.setTokens);

  const verifyOtpMutation = useMutation({
    mutationFn: async (otpValue: string) => {
      if (!registrationData?.email) {
        throw new Error("Email not found. Please register first.");
      }

      try {
        const response = await internalApi.post<VerifyOtpResponse>(
          "/auth/verify-otp",
          {
            email: registrationData.email,
            otp: otpValue,
          }
        );

        const { accessToken, refreshToken } = response.data;

        if (accessToken) {
          localStorage.setItem("accessToken", accessToken);
        }

        if (refreshToken) {
          localStorage.setItem("refreshToken", refreshToken);
        }

        setTokens({ accessToken, refreshToken });

        await signIn("credentials", {
          redirect: false,
          email: registrationData.email,
          password: registrationData?.password,
        });

        addToast({
          color: "success",
          variant: "flat",
          title: "Verifying OTP Successfully",
          shouldShowTimeoutProgress: true,
          timeout: 3000,
          description: "You have successfully registered.",
        });

        clearRegistrationData();

        return response.data;
      } catch (error) {
        let errorMessage = "An unexpected error occurred";

        if (axios.isAxiosError(error)) {
          errorMessage =
            error.response?.data?.message ||
            (typeof error.response?.data === "string"
              ? error.response.data
              : "Register failed");
        } else if (error instanceof Error) {
          errorMessage = error.message;
        }
        setError(errorMessage);
        addToast({
          color: "danger",
          variant: "bordered",
          title: "Authentication Error",
          shouldShowTimeoutProgress: true,
          timeout: 3000,
          description: errorMessage,
        });

        throw new Error(errorMessage);
      }
    },
    onSuccess: () => {
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 6) {
      await verifyOtpMutation.mutateAsync(otp);
    }
  };

  return {
    otp,
    setOtp,
    handleSubmit,
    email: registrationData?.email,
    isVerifying: verifyOtpMutation.isPending,
    isSuccess: verifyOtpMutation.isSuccess,
    isError: verifyOtpMutation.isError,
    error,
    reset: verifyOtpMutation.reset,
  };
};
