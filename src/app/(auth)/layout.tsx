import "@/styles/globals.css";
import { Metadata } from "next";
import Image from "next/image";

import { siteConfig } from "@/config/site";
import bg from "@/public/bg/authBg.svg";
export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="relative w-screen min-h-screen">
      <div className="fixed inset-0 w-full h-full pointer-events-none">
        <Image
          fill
          priority
          alt="background"
          className="object-cover"
          quality={100}
          src={bg}
        />
        <span className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
      </div>
      <main className="relative z-10">{children}</main>
      <footer className="absolute z-10 flex justify-between w-full text-lg font-bold uppercase px-14 bottom-6">
        <span>aquaverse</span>
        <span>v1.0</span>
      </footer>
    </section>
  );
}
