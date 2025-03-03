import { useState } from "react";

export const useOtp = () => {
  const [otp, setOtp] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 6) {
      alert(`Verifying OTP: ${otp}`);
    }
  };

  return { otp, setOtp, handleSubmit };
};
