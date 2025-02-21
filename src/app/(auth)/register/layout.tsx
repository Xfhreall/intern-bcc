import { Metadata } from "next";

type LayoutProps = {
  children: React.ReactNode;
};

export const generateMetadata = (): Metadata => {
  return {
    title: "Register",
    description: "Login to access your account",
  };
};

export default function Layout({ children }: LayoutProps) {
  return <>{children}</>;
}
