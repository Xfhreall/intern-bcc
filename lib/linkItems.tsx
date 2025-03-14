import { LayoutDashboard } from "lucide-react";

import { SeareportIcon, DonationIcon, NewsIcon, EventIcon } from "@/public/icon/sidebarIcon";

export const links = [
  {
    label: 'Dashboard',
    href: "/dashboard",
    icon: (
      <LayoutDashboard />
    )
  },
  {
    label: "SeaReport",
    href: "/dashboard/sea-report",
    icon: <SeareportIcon className="flex-shrink-0 w-5 h-5 fill-gray-700" />,
  },
  {
    label: "Donation",
    href: "/dashboard/donation",
    icon: (
      <DonationIcon className="flex-shrink-0 w-5 h-5 fill-gray-700" />
    ),
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
];