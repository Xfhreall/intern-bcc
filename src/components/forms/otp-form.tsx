"use client";
import type React from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/public/icon/googleIcon";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useOtp } from "@/hooks/useOtp";
import { Logo } from "@/public/icon/logo";

const OtpForm = () => {
  const router = useRouter();
  const { otp, setOtp, handleSubmit, email, isVerifying, isSuccess } = useOtp();

  if (!email) {
    if (typeof window !== "undefined") {
      router.push("/register");
    }

    return null;
  }

  return (
    <div className="w-full max-w-md p-8 mx-auto space-y-6 bg-transparent rounded-lg shadow-xl md:bg-white">
      <div className="relative flex flex-col items-center justify-center mb-6">
        <Link
          className="absolute top-0 flex items-center self-start gap-1 text-primary hover:underline"
          href="/"
        >
          <ArrowLeft className="size-5" />
          Home
        </Link>
        <Logo className="mb-4 size-16" />
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-gray-800">
            Verify Your Email!
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Check your email to get the OTP Code
          </p>
        </div>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid justify-center gap-2">
          <InputOTP required maxLength={6} value={otp} onChange={setOtp}>
            <InputOTPGroup className="space-x-2">
              <InputOTPSlot
                className="text-xl font-semibold text-center border border-gray-500 rounded-lg w-14 h-14 focus:outline-none"
                index={0}
              />
              <InputOTPSlot
                className="text-xl font-semibold text-center border border-gray-500 rounded-lg w-14 h-14 focus:outline-none"
                index={1}
              />
              <InputOTPSlot
                className="text-xl font-semibold text-center border border-gray-500 rounded-lg w-14 h-14 focus:outline-none"
                index={2}
              />
              <InputOTPSlot
                className="text-xl font-semibold text-center border border-gray-500 rounded-lg w-14 h-14 focus:outline-none"
                index={3}
              />
              <InputOTPSlot
                className="text-xl font-semibold text-center border border-gray-500 rounded-lg w-14 h-14 focus:outline-none"
                index={4}
              />
              <InputOTPSlot
                className="text-xl font-semibold text-center border border-gray-500 rounded-lg w-14 h-14 focus:outline-none"
                index={5}
              />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <Button
          className="w-full h-12 bg-primary hover:bg-primary/90"
          disabled={otp.length !== 6 || isVerifying || isSuccess}
          type="submit"
        >
          {isVerifying ? "Verifying..." : "Verify"}
        </Button>
      </form>

      <p className="text-sm text-center text-gray-600">
        By registering, you agree to the{" "}
        <Link className="text-primary hover:underline" href="/privacy">
          Privacy Policy
        </Link>{" "}
        &{" "}
        <Link className="text-primary hover:underline" href="/terms">
          Terms of Service
        </Link>
      </p>

      <div className="flex items-center my-6">
        <div className="flex-grow h-px bg-gray-300" />
        <span className="px-4 text-sm text-gray-500">Or</span>
        <div className="flex-grow h-px bg-gray-300" />
      </div>

      <Button
        className="w-full h-12 text-gray-700 bg-white border border-gray-400 hover:bg-gray-50"
        variant="outline"
        onClick={() => alert("Google sign in")}
      >
        <GoogleIcon />
        <span>Google</span>
      </Button>

      <div className="text-sm text-center text-gray-600">
        Already have an account?{" "}
        <Link className="text-primary hover:underline" href="/login">
          Login
        </Link>
      </div>
    </div>
  );
};

export default OtpForm;
