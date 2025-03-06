"use client";
import React, { useState } from "react";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";

import avatar from "@/public/assets/avatar/image2.svg";
import { cn } from "@/lib/utils";

export function SidebarDashboard() {
  const links = [
    {
      label: "SeaReport",
      href: "/dashboard/sea-report",
      icon: (
        <IconBrandTabler className="flex-shrink-0 w-5 h-5 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "News",
      href: "/dasboard/news",
      icon: (
        <IconUserBolt className="flex-shrink-0 w-5 h-5 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Events",
      href: "/dashboard/events",
      icon: (
        <IconSettings className="flex-shrink-0 w-5 h-5 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Donation",
      href: "/dashboard/donation",
      icon: (
        <IconArrowLeft className="flex-shrink-0 w-5 h-5 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);

  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between h-screen gap-10 bg-white">
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
              label: "Manu Arora",
              href: "#",
              icon: (
                <Image
                  alt="Avatar"
                  className="flex-shrink-0 rounded-full h-7 w-7"
                  height={50}
                  src={avatar}
                  width={50}
                />
              ),
            }}
          />
        </div>
      </SidebarBody>
    </Sidebar>
  );
}
export const Logo = () => {
  return (
    <Link
      className="relative z-20 flex items-center py-1 space-x-2 text-sm font-normal text-black"
      href="#"
    >
      <div className="flex-shrink-0 w-6 h-5 bg-black rounded-tl-lg rounded-tr-sm rounded-bl-sm rounded-br-lg dark:bg-white" />
      <motion.span
        animate={{ opacity: 1 }}
        className="font-medium text-black whitespace-pre dark:text-white"
        initial={{ opacity: 0 }}
      >
        Nautikara
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      className="relative z-20 flex items-center py-1 space-x-2 text-sm font-normal text-black"
      href="#"
    >
      <div className="flex-shrink-0 w-6 h-5 bg-black rounded-tl-lg rounded-tr-sm rounded-bl-sm rounded-br-lg dark:bg-white" />
    </Link>
  );
};
