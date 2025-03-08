"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import axios from "axios";
import { addToast } from "@heroui/toast";

import { internalApi } from "@/lib/axios";

const formSchema = z
  .object({
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

export function useResetPassword(token: string) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    if (!token) {
      addToast({
        color: "danger",
        variant: "flat",
        title: "Error",
        description: "Reset token is missing",
      });

      return;
    }

    setIsSubmitting(true);
    try {
      await internalApi.post("/reset-password", {
        token,
        password: values.password,
      });

      addToast({
        title: "Success",
        description: "Your password has been changed.",
      });

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      let errorMessage = "Failed to reset password. Please try again.";

      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data?.message || errorMessage;
      }

      addToast({
        color: "danger",
        variant: "flat",
        title: "Error",
        description: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    onSubmit,
    isSubmitting,
  };
}
