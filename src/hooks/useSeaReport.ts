"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/toast";

import { internalApi } from "@/lib/axios";

const formSchema = z.object({
  title: z.string().min(8, {
    message: "Title must be at least 8 characters.",
  }),
  street: z.string().min(8, {
    message: "Street must be at least 8 characters.",
  }),
  province: z.string().min(4, {
    message: "Province is required.",
  }),
  country: z.string().min(1, {
    message: "Country is required.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  file: z.instanceof(FileList).refine((files) => files.length > 0, {
    message: "Image file is required.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export const useSeaReport = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileType, setFileType] = useState<"image" | "video" | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      street: "",
      province: "",
      country: "",
      description: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await internalApi.post("/reports", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    },
    onSuccess: () => {
      addToast({
        color: "success",
        variant: "flat",
        title: "Report submitted",
        description: "Your report has been successfully submitted.",
      });
      form.reset();
      setPreview(null);
    },
    onError: () => {
      addToast({
        title: "Error",
        description: "Failed to submit report. Please try again.",
        variant: "flat",
        color: "danger",
      });
    },
  });

  const handleFileChange = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    const fileURL = URL.createObjectURL(file);

    if (file.type.startsWith("image/")) {
      setFileType("image");
    } else if (file.type.startsWith("video/")) {
      setFileType("video");
    } else {
      setFileType(null);
    }

    setPreview(fileURL);
  };

  const onSubmit = async (values: FormValues) => {
    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("street", values.street);
    formData.append("province", values.province);
    formData.append("country", values.country);
    formData.append("description", values.description);

    if (values.file && values.file.length > 0) {
      formData.append("file", values.file[0]);
    }
    mutation.mutate(formData);
  };

  return {
    onSubmit,
    form,
    handleFileChange,
    preview,
    isLoading: mutation.isPending,
    fileType,
  };
};
