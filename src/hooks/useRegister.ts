import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import * as z from "zod";
import axios from "axios";
import { addToast } from "@heroui/toast";

import { internalApi } from "@/lib/axios";
import { RegisterPayload } from "@/types/authTypes";
import { useAuthStore } from "@/store/authStore";

const formSchema = z
  .object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

export const useRegister = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const setRegistrationData = useAuthStore(
    (state) => state.setRegistrationData
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: RegisterPayload) => {
      try {
        const res = await internalApi.post("/auth/register", data);

        setRegistrationData({
          email: data.email,
          password: data.password,
        });

        addToast({
          color: "success",
          variant: "flat",
          title: "Registration Successful",
          description: "You will be redirecting to otp page",
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
          title: "Authentication Error",
          shouldShowTimeoutProgress: true,
          timeout: 3000,
          description: errorMessage,
        });

        throw new Error(errorMessage);
      }
    },
    onSuccess: () => {
      router.push("/register/otp");
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    mutation.mutate({
      email: values.email,
      password: values.password,
    });
  });

  return { form, onSubmit, isLoading: mutation.isPending, error };
};
