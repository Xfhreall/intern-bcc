import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import * as z from "zod";

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
      const res = await internalApi.post("/auth/register", data);

      setRegistrationData({
        email: data.email,
        password: data.password,
      });

      return res.data;
    },
    onSuccess: () => {
      router.push("/register/otp");
    },
    onError: (error) => {
      console.error("Registration failed:", error);
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    mutation.mutate({
      email: values.email,
      password: values.password,
    });
  });

  return { form, onSubmit, isLoading: mutation.isPending };
};
