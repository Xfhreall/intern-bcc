import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSession } from "next-auth/react";
import axios from "axios";
import { addToast } from "@heroui/toast";

import { internalApi } from "@/lib/axios";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  location: z.string().min(1, "Location is required"),
  description: z.string().min(1, "Description is required"),
  province: z.string().min(1, "Province is required"),
  country: z.string().min(1, "Country is required"),
});

type FormValues = z.infer<typeof formSchema>;

export const useSeaReport = () => {
  const { data: session } = useSession();
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      location: "",
      description: "",
      province: "",
      country: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();

      formData.append("title", values.title);
      formData.append("location", values.location);
      formData.append("description", values.description);
      formData.append("province", values.province);
      formData.append("country", values.country);
      formData.append("email", session?.user?.email || "");
      if (file) {
        formData.append("file", file);
      }

      const token = localStorage.getItem("accessToken");

      await internalApi.post("/reports", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      addToast({
        title: "Success",
        description: "Report submitted successfully",
      });

      form.reset();
      setFile(null);
    } catch (error) {
      let errorMessage = "Failed to submit report. Please try again.";

      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data?.message || errorMessage;
      }

      addToast({
        variant: "flat",
        color: "danger",
        title: "Error",
        description: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return { onSubmit, isSubmitting, form };
};
