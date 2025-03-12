"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

import { Sidebar, SidebarBody, SidebarButton, SidebarLink } from "./ui/sidebar";

import {
  NewsIcon,
  SeareportIcon,
  EventIcon,
  DonationIcon,
} from "@/public/icon/sidebarIcon";
import { LogoBlack } from "@/public/icon/logo";



export function SidebarDashboard() {
  const pathname = usePathname();

  const links = [
    {
      label: "SeaReport",
      href: "/dashboard/sea-report",
      icon: <SeareportIcon className="flex-shrink-0 w-5 h-5 fill-gray-700" />,
    },
    {
      label: "News",
      href: "/dashboard/news",
      icon: (
        <NewsIcon className="flex-shrink-0 w-5 h-5 fill-gray-700" />
      ),
    },
    {
      label: "Events",
      href: "/dashboard/events",
      icon: (
        <EventIcon className="flex-shrink-0 w-5 h-5 fill-gray-700" />
      ),
    },
    {
      label: "Donation",
      href: "/dashboard/donation",
      icon: (
        <DonationIcon className="flex-shrink-0 w-5 h-5 fill-gray-700" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);

  return (
    <section className="sticky top-0 left-0 justify-between h-screen">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="gap-10 bg-white shadow-xl">
          <div className="flex flex-col flex-1 overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
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
          <SidebarButton />
        </SidebarBody>
      </Sidebar>
    </section>

  );
}
export const Logo = () => {
  return (
    <header className="relative z-20 flex items-center py-1 space-x-2 text-sm font-normal text-black">
      <LogoBlack className="size-6" />
      <motion.span
        animate={{ opacity: 1 }}
        className="text-lg font-semibold text-black whitespace-pre"
        initial={{ opacity: 0 }}
      >
        Nautikara
      </motion.span>
    </header>
  );
};
export const LogoIcon = () => {
  return <LogoBlack className="size-6" />;
};
