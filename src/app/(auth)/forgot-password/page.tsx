"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export default function ForgotPassword() {
  const [isEmailSent, setIsEmailSent] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsEmailSent(true);
  };

  if (isEmailSent) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-8 mx-auto space-y-6 bg-white rounded-lg shadow-xl">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 rounded-lg bg-primary"></div>
            <div className="text-center">
              <h1 className="text-2xl font-semibold text-gray-800">
                Your Link Has Been Sent!
              </h1>
              <p className="mt-2 text-gray-600">Check your email now</p>
            </div>
          </div>

          <Input
            type="email"
            value={form.getValues("email")}
            className="h-12"
            disabled
          />

          <Button
            className="w-full h-12 bg-primary hover:bg-primary/90"
            onClick={() => form.handleSubmit(onSubmit)()}
          >
            Didn&apos;t get the email? Send again.
          </Button>

          <div className="text-center">
            <Link href="/login" className="text-primary hover:underline">
              Go Back
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 mx-auto space-y-6 bg-white rounded-lg shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 rounded-lg bg-primary"></div>
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-800">
              Forgot Your Password?
            </h1>
            <p className="mt-2 text-gray-600">Don&apos;t worry we got you</p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Example@gmail.com"
                      className="h-12"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full h-12 bg-primary hover:bg-primary/90"
            >
              Send Verification Link
            </Button>
          </form>
        </Form>

        <div className="text-center">
          <Link href="/login" className="text-primary hover:underline">
            Go Back
          </Link>
        </div>
      </div>
    </div>
  );
}
