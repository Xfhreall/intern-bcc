"use client";
import Link, { LinkProps } from "next/link";
import React, { useState, createContext, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { LogOut } from "lucide-react";

import { Button } from "./button";

import { cn } from "@/lib/utils";
import { useLogout } from "@/hooks/useLogout";

interface Links {
  label: string;
  href: string;
  icon: React.ReactNode;
}
interface Button {
  label: string;
  icon: React.ReactNode;
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

export const useSidebar = () => {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }

  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  return (
    <SidebarProvider animate={animate} open={open} setOpen={setOpen}>
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...(props as React.ComponentProps<"div">)} />
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  const { open, setOpen, animate } = useSidebar();

  return (
    <>
      <motion.div
        animate={{
          width: animate ? (open ? "250px" : "60px") : "250px",
        }}
        className={cn(
          "hidden pt-4 md:flex md:flex-col bg-neutral-100 dark:bg-neutral-800 w-[300px] flex-shrink-0 sticky h-screen top-0 left-0 z-50",
          className
        )}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        {...props}
      >
        {children}
      </motion.div>
    </>
  );
};

export const MobileSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  const { open, setOpen } = useSidebar();

  return (
    <div className="sticky top-0 left-0 hidden bg-white md:hidden">
      <button className="z-20 flex justify-end w-full">
        <IconMenu2
          className="text-neutral-800 dark:text-neutral-200"
          onClick={() => setOpen(!open)}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            animate={{ x: 0, opacity: 1 }}
            className={cn(
              "fixed h-full w-full inset-0 bg-white p-10 z-[100] flex flex-col justify-between",
              className
            )}
            exit={{ x: "-100%", opacity: 0 }}
            initial={{ x: "-100%", opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
          >
            <button
              aria-label="Close sidebar"
              className="absolute z-50 right-10 top-10 text-neutral-800 dark:text-neutral-200"
              onClick={() => setOpen(!open)}
            >
              <IconX />
            </button>
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const SidebarLink = ({
  link,
  isActive,
}: {
  link: Links;
  className?: string;
  props?: LinkProps;
  isActive?: boolean;
}) => {


  return (
    <Link
      className={cn(
        "flex items-center gap-2 px-10 py-4 transition-colors",
        isActive ? "bg-primary text-white font-medium" : "hover:bg-gray-100 text-gray-500",
      )}
      href={link.href}
    >
      {React.cloneElement(link.icon as React.ReactElement, {
        className: cn("flex-shrink-0 w-5 h-5", isActive ? "fill-white" : "fill-gray-500"),
      })}
      <span className="overflow-hidden text-sm whitespace-nowrap">{link.label}</span>
    </Link>
  );
};
export const SidebarButton = ({
  className,
  ...props
}: {
  className?: string;
  props?: LinkProps;
}) => {
  const { open, animate } = useSidebar();
  const logout = useLogout();

  return (
    <Button
      className={cn(
        "flex items-center gap-2 px-10 py-6 justify-start rounded-none transition-colors bg-red-600 hover:bg-red-700",
        className
      )}
      onClick={() => logout.mutate()}
      {...props}
    >
      <LogOut className="flex-shrink-0 w-5 h-5 " />
      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className="overflow-hidden text-sm whitespace-nowrap"
      >
        Log Out
      </motion.span>
    </Button>
  );
};
