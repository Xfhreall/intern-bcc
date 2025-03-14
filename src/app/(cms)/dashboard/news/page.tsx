import React from "react";

import NewsPage from "@/app/(feature)/news/page";
import { HeaderDashboard } from "@/components/ui/header-dashboard";

const NewsDashboard = () => {
  return (
    <section className="flex flex-col w-full">
      <HeaderDashboard />
      <NewsPage />
    </section>
  );
};

export default NewsDashboard;
