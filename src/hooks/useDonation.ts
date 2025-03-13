import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { addToast } from "@heroui/toast";

import { internalApi } from "@/lib/axios";
import { DonationPayload } from "@/types/donationType";

const formSchema = z.object({
  amount: z.number().min(1, "Please select nominal donation"),
  phone: z.string().min(8, "Please enter your phone number"),
});

type FormValues = z.infer<typeof formSchema>;

export const useDonation = () => {
  const [PhoneCheck, setPhoneCheck] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      phone: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: DonationPayload) => {
      try {
        const res = await internalApi.post<DonationPayload>("/donation", data);

        addToast({
          color: "success",
          variant: "flat",
          title: "Request Success",
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
      setError("An error occurred while proccess donation.");
    },
    onSuccess: () => {
      setPhoneCheck(true);
      setError("");
    },
  });

  const onSubmit = (values: FormValues) => {
    mutation.mutate({
      amount: values.amount,
      phone: values.phone,
    });
  };

  return {
    form,
    onSubmit,
    PhoneCheck,
    isLoading: mutation.isPending,
    error,
  };
};
