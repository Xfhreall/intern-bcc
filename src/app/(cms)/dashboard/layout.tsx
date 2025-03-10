import "@/styles/globals.css";
import { Metadata } from "next";

import { SidebarDashboard } from "@/components/sidebar-dashboard";
import { SidebarProvider } from "@/components/ui/sidebar";

export const metadata: Metadata = {
  title: {
    default: "Dashboard - Nautikara",
    template: `%s - Dashboard`,
  },
  description: "Nautikara Dashboard",
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
    <SidebarProvider>
      <div className="relative flex w-screen min-h-screen">
        <SidebarDashboard />
        {children}
      </div>
    </SidebarProvider>
  );
}
