"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

import { Sidebar, SidebarBody, SidebarButton, SidebarLink } from "./ui/sidebar";

import { LogoBlack } from "@/public/icon/logo";
import { links } from "@/lib/linkItems";



export function SidebarDashboard() {
  const pathname = usePathname();


  const [open, setOpen] = useState(false);

  return (
    <Sidebar animate={false} open={open} setOpen={setOpen}>
      <SidebarBody className="gap-10 bg-white shadow-xl">
        <div className="flex flex-col overflow-x-hidden">
          <Logo />
          <div className="flex flex-col gap-2 mt-8">
            {links.map((link, idx) => (
              <SidebarLink
                key={idx}
                isActive={pathname === link.href}
                link={link}
              />
            ))}
          </div>
        </div>
        <SidebarButton className="mt-auto mb-0 sm:mb-6" />
      </SidebarBody>
    </Sidebar>
  );
}
export const Logo = () => {
  return (
    <main className="relative z-20 flex items-center py-1 pl-10 space-x-2 text-sm font-normal text-black">
      <LogoBlack className="size-6" />
      <motion.span
        animate={{ opacity: 1 }}
        className="text-lg font-semibold text-black whitespace-pre"
        initial={{ opacity: 0 }}
      >
        Nautikara
      </motion.span>
    </main>
  );
};