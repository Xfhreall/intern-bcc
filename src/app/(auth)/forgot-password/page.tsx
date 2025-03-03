"use client";

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
import { useForgot } from "@/hooks/useForgot";

const ForgotPassword = () => {
  const { form, onSubmit, isEmailSent } = useForgot();

  if (isEmailSent) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-8 mx-auto space-y-6 bg-white rounded-lg shadow-xl">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 rounded-lg bg-primary" />
            <div className="text-center">
              <h1 className="text-2xl font-semibold text-gray-800">
                Your Link Has Been Sent!
              </h1>
              <p className="mt-2 text-gray-600">Check your email now</p>
            </div>
          </div>

          <Input
            disabled
            className="h-12"
            type="email"
            value={form.getValues("email")}
          />

          <Button
            className="w-full h-12 bg-primary hover:bg-primary/90"
            onClick={() => form.handleSubmit(onSubmit)()}
          >
            Didn&apos;t get the email? Send again.
          </Button>

          <div className="text-center">
            <Link className="text-primary hover:underline" href="/login">
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
          <div className="w-16 h-16 rounded-lg bg-primary" />
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-800">
              Forgot Your Password?
            </h1>
            <p className="mt-2 text-gray-600">Don&apos;t worry we got you</p>
          </div>
        </div>

        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="h-12"
                      placeholder="Example@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className="w-full h-12 bg-primary hover:bg-primary/90"
              type="submit"
            >
              Send Verification Link
            </Button>
          </form>
        </Form>

        <div className="text-center">
          <Link className="text-primary hover:underline" href="/login">
            Go Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
