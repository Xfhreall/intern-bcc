"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

import { LoginForm } from "@/components/forms/login-form";

const Login = () => {
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
    }
    if (status === "authenticated") {
      redirect("/dashboard");
    }
  }, [status]);


  if (status === "authenticated") {
    return null;
  }

  return <LoginPage />;
};

const LoginPage = () => {
  return <LoginForm />;
};

export default Login;
