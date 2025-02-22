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
import { useRegister } from "@/src/hooks/useRegister";
import { GoogleIcon } from "@/public/icon/googleIcon";

export default function Register() {
  const { form, onSubmit } = useRegister();

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-lg p-12 mx-auto space-y-4 rounded-lg h-max bg-black/20 backdrop-blur-xl">
        <div className="flex flex-col gap-2 mb-12">
          <h1 className="text-3xl font-semibold tracking-wider text-white">
            Ikuti Kami!
          </h1>
          <p className="text-3xl font-semibold tracking-wide text-white dark:text-gray-400">
            Membuat Akun Baru
          </p>
          <p className="mt-4 text-sm font-light tracking-wider text-white dark:text-gray-400">
            Ambil bagian untuk menjaga kehidupan laut
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
                name="terms"
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      required
                      checked={field.value}
                      className="border-white rounded-md size-5"
                      id="terms"
                      onCheckedChange={field.onChange}
                    />
                    <label
                      className="text-sm font-medium leading-none text-white peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor="terms"
                    >
                      Ketentuan Layanan dan Kebijakan Privasi
                    </label>
                  </div>
                )}
              />
            </div>
            <Button className="w-full mt-8 h-11" type="submit">
              Daftar
            </Button>
          </form>
        </Form>
        <div className="space-y-4">
          <Button
            className="w-full text-white bg-transparent border-white h-11 hover:bg-white/10"
            variant="outline"
            onClick={() => alert("init dummy :D")}
          >
            <GoogleIcon />
            <span>Lanjutkan dengan Google</span>
          </Button>
          <div className="text-sm text-center text-white">
            Sudah Punya Akun?{" "}
            <Link
              className="font-bold text-primary hover:underline"
              href="/login"
            >
              Masuk
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
