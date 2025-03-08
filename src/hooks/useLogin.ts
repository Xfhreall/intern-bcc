"use client";

import type { LoginPayload, LoginResponse } from "@/types/authTypes";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { addToast } from "@heroui/toast";

import { internalApi } from "@/lib/axios";
import { useAuthStore } from "@/store/authStore";

const loginFormSchema = z.object({
  email: z.string().email({
    message: "Masukkan alamat email yang valid.",
  }),
  password: z.string().min(8, {
    message: "Password harus minimal 8 karakter.",
  }),
  rememberMe: z.boolean().default(false),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;
export function useLoginForm() {
  const [error, setError] = useState("");
  const router = useRouter();
  const setTokens = useAuthStore((state) => state.setTokens);
  const setRegistrationData = useAuthStore(
    (state) => state.setRegistrationData
  );

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const mutation = useMutation({
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
          rememberMe: credentials.rememberMe,
          callbackUrl: "/dashboard",
        });

        if (result?.error) {
          throw new Error(result.error);
        }

        return data;
      } catch (error) {
        let errorMessage = "An unexpected error occurred";

        if (axios.isAxiosError(error)) {
          errorMessage =
            error.response?.data?.message ||
            (typeof error.response?.data === "string"
              ? error.response.data
              : "Login failed");
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
      router.push("/dashboard");
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    mutation.mutate({
      email: values.email,
      password: values.password,
      rememberMe: values.rememberMe,
    });
  };

  return {
    form,
    onSubmit,
    isLoading: mutation.isPending,
    error,
  };
}

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
        let errorMessage = "An unexpected error occurred";

        if (axios.isAxiosError(error)) {
          errorMessage =
            error.response?.data?.message ||
            (typeof error.response?.data === "string"
              ? error.response.data
              : "Login failed");
        } else if (error instanceof Error) {
          errorMessage = error.message;
        }

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
      router.push("/dashboard");
    },
  });
}
