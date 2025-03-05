import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { LoginPayload } from "@/types/authTypes";

const formSchema = z.object({
  email: z.string().email({
    message: "Masukkan alamat email yang valid.",
  }),
  password: z.string().min(8, {
    message: "Password harus minimal 8 karakter.",
  }),
  rememberMe: z.boolean().default(false),
});

export type LoginFormValues = z.infer<typeof formSchema>;

export function useLogin() {
  const router = useRouter();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: LoginPayload) => {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
      });

      if (!result?.ok) {
        throw new Error("Credential Invalid");
      }

      return result;
    },
    onSuccess: () => {
      alert("Credential Success");
      router.push("/");
    },
    onError: (error) => {
      alert(error.message);
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
  };
}
