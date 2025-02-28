"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useLogin } from "@/hooks/useLogin";
import { GoogleIcon } from "@/public/icon/googleIcon";

export default function Login() {
  const { form, onSubmit } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full max-w-md p-8 mx-auto space-y-6 bg-white rounded-lg shadow-xl">
      <div className="flex flex-col items-center justify-center mb-6">
        <div className="w-16 h-16 mb-4 rounded-lg bg-[#0077b6]" />
        <h1 className="text-2xl font-semibold text-center text-gray-800">
          Welcome Back!
        </h1>
        <p className="text-center text-gray-600">Enter your data to continue</p>
      </div>

      <Form {...form}>
        <form
          className="flex flex-col gap-5"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="space-y-2">
            <label className="font-medium text-gray-700" htmlFor="email">
              Email
            </label>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      id="email"
                      placeholder="example@email.com"
                      {...field}
                      className="h-12 border-gray-300 rounded-md"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-2">
            <label className="font-medium text-gray-700" htmlFor="password">
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
                        id="password"
                        placeholder="••••••••"
                        {...field}
                        className="h-12 pr-10 border-gray-300 rounded-md"
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
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center justify-between">
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={field.value}
                    className="h-5 w-5 rounded border-gray-300 text-[#0077b6]"
                    id="rememberMe"
                    onCheckedChange={field.onChange}
                  />
                  <label
                    className="text-sm font-medium text-gray-700"
                    htmlFor="rememberMe"
                  >
                    Remember me
                  </label>
                </div>
              )}
            />
            <Link
              className="text-sm text-[#0077b6] hover:underline"
              href="/forgot-password"
            >
              Forgot password?
            </Link>
          </div>
          <Button
            className="w-full h-12 mt-2 text-white bg-[#0077b6] hover:bg-[#006da8]"
            type="submit"
          >
            Login
          </Button>
        </form>
      </Form>

      <div className="flex items-center my-6">
        <div className="flex-grow h-px bg-gray-300" />
        <span className="px-4 text-sm text-gray-500">Or</span>
        <div className="flex-grow h-px bg-gray-300" />
      </div>

      <Button
        className="w-full h-12 text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
        variant="outline"
        onClick={() => alert("Google login")}
      >
        <GoogleIcon />
        Google
      </Button>

      <div className="mt-6 text-sm text-center text-gray-700">
        Don&apos;t have an account?{" "}
        <Link
          className="font-medium text-[#0077b6] hover:underline"
          href="/register"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
