"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import axios from "axios";
import { addToast } from "@heroui/toast";
import { useMutation } from "@tanstack/react-query";

import { internalApi } from "@/lib/axios";
import { ResetPasswordParams } from "@/types/authTypes";

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

const resetPassword = async ({
  resetToken,
  newPassword,
}: ResetPasswordParams) => {
  const response = await internalApi.post(
    `/auth/reset-password/${resetToken}`,
    {
      resetToken,
      newPassword,
    }
  );

  return response.data;
};

export function useResetPassword(resetToken: string) {
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const mutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      addToast({
        color: "success",
        variant: "flat",
        title: "Success",
        description: "Your password has been changed.",
      });

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    },
    onError: (error) => {
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
    },
  });

  const onSubmit = async (values: FormValues) => {
    if (!resetToken) {
      addToast({
        color: "danger",
        variant: "flat",
        title: "Error",
        description: "Reset token is missing",
      });

      return;
    }

    mutation.mutate({
      resetToken,
      newPassword: values.password,
    });
  };

  return {
    form,
    onSubmit,
    isSubmitting: mutation.isPending,
  };
}
