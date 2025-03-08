"use client";
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useParams } from "next/navigation";

import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useResetPassword } from "@/hooks/useResetPassword";
import { Logo } from "@/public/icon/logo";

const ResetPasswordForm = () => {
    const params = useParams();
    const resetToken = params.resetToken as string;
    const { form, onSubmit } = useResetPassword(resetToken);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="w-full max-w-md p-8 mx-auto space-y-6 bg-white rounded-lg shadow-xl">
                <div className="flex flex-col items-center justify-center space-y-4">
                    <Logo className="size-16" />
                    <div className="text-center">
                        <h1 className="text-2xl font-semibold text-gray-800">
                            Change Your Password
                        </h1>
                        <p className="mt-2 text-gray-600">Make sure you can remember it!</p>
                    </div>
                </div>

                <Form {...form}>
                    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="space-y-2 ">
                            <label htmlFor="password">New Password</label>
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    className="h-12 pr-10"
                                                    placeholder="••••••••"
                                                    type={showPassword ? "text" : "password"}
                                                    {...field}
                                                />
                                                <button
                                                    className="absolute text-gray-500 -translate-y-1/2 right-3 top-1/2"
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
                        <div className="space-y-2 ">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    className="h-12 pr-10"
                                                    placeholder="••••••••"
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    {...field}
                                                />
                                                <button
                                                    className="absolute text-gray-500 -translate-y-1/2 right-3 top-1/2"
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
                            Change Password
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

export default ResetPasswordForm;
