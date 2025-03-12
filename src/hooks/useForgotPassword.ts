import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { addToast } from "@heroui/toast";

import { internalApi } from "@/lib/axios";
import { ForgotPasswordPayload } from "@/types/authTypes";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type FormValues = z.infer<typeof formSchema>;

export const useForgot = () => {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: ForgotPasswordPayload) => {
      try {
        const res = await internalApi.post<ForgotPasswordPayload>(
          "/auth/forgot-password",
          data
        );

        addToast({
          color: "success",
          variant: "flat",
          title: "Request Success",
          description: "Check your email now",
          timeout: 3000,
        });

        return res.data;
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
          title: "Request Failed",
          shouldShowTimeoutProgress: true,
          timeout: 3000,
          description: errorMessage,
        });

        throw new Error(errorMessage);
      }
    },
    onError: () => {
      setError("An error occurred while sending the email.");
    },
    onSuccess: () => {
      setIsEmailSent(true);
      setError("");
    },
  });

  const onSubmit = (values: FormValues) => {
    mutation.mutate({
      email: values.email,
    });
  };

  return {
    form,
    onSubmit,
    isEmailSent,
    isLoading: mutation.isPending,
    error,
  };
};
