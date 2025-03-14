"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { useLoginForm } from "@/hooks/useLogin";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/public/icon/googleIcon";
import { Logo } from "@/public/icon/logo";
import { api } from "@/lib/axios";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { form, onSubmit, isLoading } = useLoginForm();
  const router = useRouter();
  const { status } = useSession();
  const searchParams = useSearchParams();
  const [googleLoading, setGoogleLoading] = useState(false);

  const error = searchParams.get("error");

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }


  }, [error, router, status]);

  const handleSubmit = form.handleSubmit((data) => {
    onSubmit(data);
  });

  const handleGoogleLogin = async () => {
    try {
      const response = await api.get(
        `/auth/google`
      );

      if (response.data.code === 200) {
        const redirectLink = response.data.data.redirect_link;
        const JWTtoken = response.data.data?.token;

        // Store the JWT token if necessary
        if (JWTtoken) {
          localStorage.setItem("authToken", JWTtoken);
        }

        // Redirect to the OAuth URL
        window.location.href = redirectLink;
      }
    } catch (error) {
      console.error("Error during Google OAuth:", error);
    }
  };

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
        <h1 className="text-2xl font-semibold text-center text-gray-800">
          Welcome Back!
        </h1>
        <p className="text-sm text-center text-gray-600">
          Explore, donate and help protect marine life with us!
        </p>
      </div>

      <Form {...form}>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
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
                      disabled={isLoading || googleLoading}
                      type="email"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
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
                        disabled={isLoading || googleLoading}
                        type={showPassword ? "text" : "password"}
                      />
                      <button
                        className="absolute text-gray-500 transform -translate-y-1/2 right-3 top-1/2"
                        disabled={isLoading || googleLoading}
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
                    className="w-5 h-5 border-gray-300 rounded text-primary"
                    disabled={isLoading || googleLoading}
                    id="rememberMe"
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="rememberMe">Remember me</Label>
                </div>
              )}
            />
            <Link
              className="text-sm text-primary hover:underline"
              href="/forgot-password"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            className="w-full h-12 mt-2 text-white bg-primary hover:bg-[#006da8]"
            disabled={isLoading || googleLoading}
            type="submit"
          >
            {isLoading ? "Logging in..." : "Login"}
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
        disabled={isLoading || googleLoading}
        variant="outline"
        onClick={handleGoogleLogin}
      >
        {googleLoading ? (
          <>
            <span className="w-5 h-5 mr-2 border-2 border-gray-300 rounded-full border-t-gray-600 animate-spin" />
            <span>Connecting...</span>
          </>
        ) : (
          <>
            <GoogleIcon />
            <span className="ml-2">Continue with Google</span>
          </>
        )}
      </Button>

      <div className="mt-6 text-sm text-center text-gray-700">
        Don&apos;t have an account?{" "}
        <Link
          className="font-medium text-primary hover:underline"
          href="/register"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
