"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRegister } from "@/src/hooks/useRegister";
import { GoogleIcon } from "@/public/icon/googleIcon";
import { Logo } from "@/public/icon/logo";

const RegisterForm = () => {
  const { form, onSubmit, isLoading } = useRegister();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="w-full max-w-md p-8 mx-auto space-y-6 bg-white rounded-lg shadow-xl">
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
            Register now!
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Join and start contributing to protecting marine life!
          </p>
        </div>
      </div>
      <Form {...form}>
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
          <div className="space-y-2">
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="example@gmail.com"
                      {...field}
                      className="h-12 border-gray-400"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2">
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="••••••••"
                        {...field}
                        className="h-12 pr-10 border-gray-400"
                        type={showPassword ? "text" : "password"}
                      />
                      <button
                        className="absolute text-gray-500 transform -translate-y-1/2 right-3 top-1/2"
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2">
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="••••••••"
                        {...field}
                        className="h-12 pr-10 border-gray-400"
                        type={showConfirmPassword ? "text" : "password"}
                      />
                      <button
                        className="absolute text-gray-500 transform -translate-y-1/2 right-3 top-1/2"
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            className="w-full h-12 bg-primary hover:bg-primary/90"
            type="submit"
          >
            {isLoading ? "Loading..." : "Sign Up"}
          </Button>
        </form>
      </Form>
      <div className="space-y-4 text-center">
        <div className="flex items-start space-x-2">
          <label className="text-sm text-gray-600" htmlFor="terms">
            By registering, you agree to the{" "}
            <Link
              className="font-medium text-primary hover:underline"
              href="/privacy"
            >
              Privacy Policy
            </Link>{" "}
            &{" "}
            <Link
              className="font-medium text-primary hover:underline"
              href="/terms"
            >
              Terms of Service
            </Link>
          </label>
        </div>
      </div>
      <div className="flex items-center my-6">
        <div className="flex-grow h-px bg-gray-300" />
        <span className="px-4 text-sm text-gray-500">Or</span>
        <div className="flex-grow h-px bg-gray-300" />
      </div>
      <Button
        className="w-full h-12 text-gray-700 bg-white border border-gray-400 hover:bg-gray-50"
        variant="outline"
        onClick={() => alert("init dummy :D")}
      >
        <GoogleIcon />
        <span>Google</span>
      </Button>
      <div className="text-sm font-medium text-center text-gray-600">
        Already have an account?{" "}
        <Link className="text-primary hover:underline" href="/login">
          Login
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
