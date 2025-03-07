"use client";
import React, { useState } from "react";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import Image from "next/image";

import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";

import avatar from "@/public/assets/avatar/image2.svg";
import {
  NewsIcon,
  SeareportIcon,
  EventIcon,
  DonationIcon,
} from "@/public/icon/sidebarIcon";
import { LogoBlack } from "@/public/icon/logo";
import { LogOut } from "lucide-react";

export function SidebarDashboard() {
  const links = [
    {
      label: "SeaReport",
      href: "/dashboard/sea-report",
      icon: <SeareportIcon className="flex-shrink-0 w-5 h-5 fill-red-500" />,
    },
    {
      label: "News",
      href: "/dashboard/news",
      icon: (
        <NewsIcon className="flex-shrink-0 w-5 h-5 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Events",
      href: "/dashboard/events",
      icon: (
        <EventIcon className="flex-shrink-0 w-5 h-5 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Donation",
      href: "/dashboard/donation",
      icon: (
        <DonationIcon className="flex-shrink-0 w-5 h-5 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);

  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between min-h-screen gap-10 bg-green-400 shadow-xl">
        <div className="flex flex-col flex-1 overflow-x-hidden overflow-y-auto">
          {open ? <Logo /> : <LogoIcon />}
          <div className="flex flex-col gap-2 mt-8">
            {links.map((link, idx) => (
              <SidebarLink key={idx} link={link} />
            ))}
          </div>
        </div>
        <div>
          <SidebarLink
            link={{
              label: "Logout",
              href: "#",
              icon: <LogOut />,
            }}
          />
        </div>
      </SidebarBody>
    </Sidebar>
  );
}
export const Logo = () => {
  return (
    <header className="relative z-20 flex items-center py-1 space-x-2 text-sm font-normal text-black">
      <LogoBlack className="size-6" />{" "}
      <motion.span
        animate={{ opacity: 1 }}
        className="font-medium text-black whitespace-pre dark:text-white"
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
