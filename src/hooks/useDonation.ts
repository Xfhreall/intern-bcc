import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";

import { DonationResponse, DonationPayload } from "@/types/donationType";
import { internalApi } from "@/lib/axios";
import { getAccessToken } from "@/store/authStore";

type FormStep = "phone" | "amount";

export const useDonation = () => {
  const [step, setStep] = useState<FormStep>("phone");
  const [phone, setPhone] = useState("");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculateTotalWithFee = (amount: number) => {
    const fee = amount * 0.01;

    return amount + fee;
  };

  const donationMutation = useMutation<
    DonationResponse,
    Error,
    DonationPayload
  >({
    mutationFn: async (data) => {
      try {
        const response = await internalApi.post("/donation", data, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
            "Content-Type": "application/json",
          },
        });

        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          throw new Error(
            error.response.data.message || "Failed to process donation"
          );
        }
        throw new Error("Failed to process donation");
      }
    },
    onSuccess: (data) => {
      if (data.transaction?.redirect_url) {
        window.location.href = data.transaction.redirect_url;
      }
    },
    onError: (error) => {
      setError(error.message || "Failed to process donation");
    },
  });

  const handleNextStep = () => {
    if (!phone || phone.length < 10) {
      setError("Please enter a valid phone number");

      return;
    }
    setError(null);
    setStep("amount");
  };

  const hanldeBackStep = () => {
    setStep("phone");
  };

  const handleSelectAmount = (amount: number) => {
    setSelectedAmount(amount);
    setError(null);
  };

  const handleDonation = () => {
    if (!selectedAmount) {
      setError("Please select a donation amount");

      return;
    }

    donationMutation.mutate({
      amount: selectedAmount,
      phone,
    });
  };

  return {
    step,
    handleNextStep,
    handleDonation,
    handleSelectAmount,
    error,
    setPhone,
    phone,
    donationMutation,
    selectedAmount,
    calculateTotalWithFee,
    hanldeBackStep,
  };
};
