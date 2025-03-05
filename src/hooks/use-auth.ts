"use client";

import type { LoginPayload, LoginResponse } from "@/types/authTypes";

import { useMutation } from "@tanstack/react-query";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { internalApi } from "@/lib/axios";
import { useAuthStore } from "@/store/authStore";

export function useLogin() {
  const router = useRouter();
  const setTokens = useAuthStore((state) => state.setTokens);
  const setRegistrationData = useAuthStore(
    (state) => state.setRegistrationData
  );

  return useMutation({
    mutationFn: async (credentials: LoginPayload) => {
      try {
        const response = await internalApi.post<LoginResponse>(
          "/auth/login",
          credentials
        );

        setRegistrationData({
          email: credentials.email,
          password: credentials.password,
        });

        const data = response.data;

        if (data.accessToken) {
          localStorage.setItem("accessToken", data.accessToken);
        }

        if (data.refreshToken) {
          localStorage.setItem("refreshToken", data.refreshToken);
        }

        if (data.accessToken && data.refreshToken) {
          setTokens({
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          });
        }

        const result = await signIn("credentials", {
          redirect: false,
          email: credentials.email,
          password: credentials.password,
          callbackUrl: "/dashboard",
        });

        if (result?.error) {
          throw new Error(result.error);
        }

        return data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(error.response?.data?.message || "Login failed");
        }
        throw error;
      }
    },
    onSuccess: () => {
      router.push("/dashboard");
    },
  });
}

export function useLogout() {
  const router = useRouter();
  const clearTokens = useAuthStore((state) => state.clearTokens);
  const clearDatas = useAuthStore((state) => state.clearRegistrationData);

  return useMutation({
    mutationFn: async () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      clearTokens();
      clearDatas();
      await signOut({ redirect: false });
    },
    onSuccess: () => {
      router.push("/");
    },
  });
}
