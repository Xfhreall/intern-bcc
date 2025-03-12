import Link from "next/link";

import { newsItems } from "@/lib/newsDatas";
import NewsCard from "@/components/ui/news-card";

export const News = () => {
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-10" id="news">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h2 className="mb-1 text-base font-semibold sm:mb-4 sm:text-lg">News</h2>
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-700 sm:text-4xl">
              Latest News
            </h3>
            <Link
              className="flex items-center text-xs font-medium sm:text-base hover:underline text-primary hover:brightness-75"
              href="/news-page"
            >
              {"Explore news >"}
            </Link>
          </div>
        </div>
        <div className="w-full overflow-x-scroll">
          <NewsCard data={newsItems} />
        </div>
      </div>
    </section>
  );
};
