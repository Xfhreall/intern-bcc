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
import { Checkbox } from "@/components/ui/checkbox";
import { useLogin } from "@/src/hooks/useLogin";

export default function Login() {
  const { form, onSubmit } = useLogin();

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-lg p-12 mx-auto space-y-4 rounded-lg h-max bg-black/30 backdrop-blur-xl">
        <div className="mb-12 space-y-1">
          <h1 className="text-3xl font-semibold tracking-wider text-white">
            Selamat Datang!
          </h1>
          <p className="text-3xl font-semibold tracking-wide text-white dark:text-gray-400">
            Masuk Kedalam Akunmu
          </p>
          <p className="text-sm font-light tracking-wider text-white dark:text-gray-400">
            Senang melihatmu datang kembali
          </p>
        </div>
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Masukkan Alamat Email"
                      {...field}
                      className="text-white border-white h-11 placeholder:text-white focus:border-white"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Masukkan Password"
                      {...field}
                      className="text-white border-white h-11 placeholder:text-white focus:border-white"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-between">
              <FormField
                control={form.control}
                name="rememberMe"
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={field.value}
                      className="border-white rounded-md size-5"
                      id="rememberMe"
                      onCheckedChange={field.onChange}
                    />
                    <label
                      className="text-sm font-medium leading-none text-white peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor="rememberMe"
                    >
                      Ingat saya
                    </label>
                  </div>
                )}
              />
              <Link
                className="text-sm text-primary hover:underline"
                href="/forgot-password"
              >
                Lupa Password?
              </Link>
            </div>
            <Button className="w-full mt-8 h-11" type="submit">
              Masuk
            </Button>
          </form>
        </Form>
        <div className="space-y-4">
          <Button
            className="w-full text-white bg-transparent border-white h-11 hover:bg-white/10"
            variant="outline"
            onClick={() => alert("init dummy :D")}
          >
            <svg
              height="20"
              viewBox="0 0 186.69 190.5"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g transform="translate(1184.583 765.171)">
                <path
                  d="M-1089.333-687.239v36.888h51.262c-2.251 11.863-9.006 21.908-19.137 28.662l30.913 23.986c18.011-16.625 28.402-41.044 28.402-70.052 0-6.754-.606-13.249-1.732-19.483z"
                  fill="#4285f4"
                />
                <path
                  d="M-1142.714-651.791l-6.972 5.337-24.679 19.223h0c15.673 31.086 47.796 52.561 85.03 52.561 25.717 0 47.278-8.486 63.038-23.033l-30.913-23.986c-8.486 5.715-19.31 9.179-32.125 9.179-24.765 0-45.806-16.712-53.34-39.226z"
                  fill="#34a853"
                />
                <path
                  d="M-1174.365-712.61c-6.494 12.815-10.217 27.276-10.217 42.689s3.723 29.874 10.217 42.689c0 .086 31.693-24.592 31.693-24.592-1.905-5.715-3.031-11.776-3.031-18.098s1.126-12.383 3.031-18.098z"
                  fill="#fbbc05"
                />
                <path
                  d="M-1089.333-727.244c14.028 0 26.497 4.849 36.455 14.201l27.276-27.276c-16.539-15.413-38.013-24.852-63.731-24.852-37.234 0-69.359 21.388-85.032 52.561l31.692 24.592c7.533-22.514 28.575-39.226 53.34-39.226z"
                  fill="#ea4335"
                />
              </g>
            </svg>
            <span>Lanjutkan dengan Google</span>
          </Button>
          <div className="text-sm text-center text-white">
            Belum Punya Akun?{" "}
            <Link
              className="font-bold text-primary hover:underline"
              href="/register"
            >
              Daftar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
