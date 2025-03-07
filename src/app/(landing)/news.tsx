import Link from "next/link";

import { newsItems } from "@/lib/newDatas";
import NewsCard from "@/components/ui/news-card";

export const News = () => {
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-10" id="news">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h2 className="mb-4 text-lg font-semibold">News</h2>
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Latest News
            </h3>
            <Link
              className="flex items-center font-medium hover:underline text-primary hover:brightness-75"
              href="/news-page"
            >
              {"Read the full news >"}
            </Link>
          </div>
        </div>
        <NewsCard data={newsItems} />
      </div>
    </section>
  );
};
