import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  email: z.string().email({
    message: "Masukkan alamat email yang valid.",
  }),
  password: z.string().min(8, {
    message: "Password harus minimal 8 karakter.",
  }),
  terms: z.boolean().default(false),
});

export type LoginFormValues = z.infer<typeof formSchema>;

export function useRegister() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      terms: false,
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    console.log(values);
  };

  return {
    form,
    onSubmit,
  };
}
