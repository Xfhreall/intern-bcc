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
import { GoogleIcon } from "@/public/icon/googleIcon";

export default function Login() {
  const { form, onSubmit } = useLogin();

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-lg p-12 mx-auto space-y-4 rounded-lg h-max bg-black/20 backdrop-blur-xl">
        <div className="flex flex-col gap-2 mb-12">
          <h1 className="text-3xl font-semibold tracking-wider text-white">
            Selamat Datang!
          </h1>
          <p className="text-3xl font-semibold tracking-wide text-white dark:text-gray-400">
            Masuk Kedalam Akunmu
          </p>
          <p className="mt-4 text-sm font-light tracking-wider text-white dark:text-gray-400">
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
            <GoogleIcon classname="size-3" />
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
