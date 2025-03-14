"use client"

import Link from "next/link"

import NewsCard from "@/components/ui/news-card"
import { useUserNews } from "@/hooks/useNews"
import { Skeleton } from "@/components/ui/skeleton-custom"

export const News = () => {
  const { data, isLoading, isError, error } = useUserNews()

  if (isLoading) {
    return (
      <section className="px-4 py-12 sm:px-6 lg:px-10" id="news">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <h2 className="mb-1 text-base font-semibold sm:mb-4 sm:text-lg">News</h2>
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-700 sm:text-4xl">Latest News</h3>
              <Link
                className="flex items-center text-xs font-medium sm:text-base hover:underline text-primary hover:brightness-75"
                href="/news"
              >
                {"Explore news >"}
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="overflow-hidden shadow rounded-xl">
                <Skeleton className="w-full h-48" />
                <div className="p-6">
                  <Skeleton className="w-3/4 h-6 mb-3" />
                  <Skeleton className="w-full h-4 mb-2" />
                  <Skeleton className="w-full h-4 mb-2" />
                  <Skeleton className="w-2/3 h-4 mb-4" />
                  <div className="flex justify-between">
                    <Skeleton className="w-24 h-4" />
                    <Skeleton className="w-24 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (isError) {
    return (
      <section className="px-4 py-12 sm:px-6 lg:px-10" id="news">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <h2 className="mb-1 text-base font-semibold sm:mb-4 sm:text-lg">News</h2>
            <h3 className="text-2xl font-bold text-gray-700 sm:text-4xl">Latest News</h3>
          </div>
          <div className="p-6 border border-red-200 rounded-lg bg-red-50">
            <p className="text-red-600">Error loading news: {error?.message || "Unknown error"}</p>
          </div>
        </div>
      </section>
    )
  }

  const newsItems = data && Array.isArray(data) ? data.slice(0, 3) : []

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-10" id="news">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h2 className="mb-1 text-base font-semibold sm:mb-4 sm:text-lg">News</h2>
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-700 sm:text-4xl">Latest News</h3>
            <Link
              className="flex items-center text-xs font-medium sm:text-base hover:underline text-primary hover:brightness-75"
              href="/news"
            >
              {"Explore news >"}
            </Link>
          </div>
        </div>
        <div className="w-full">
          {newsItems.length > 0 ? (
            <>
              <div className="md:hidden">
                <div className="flex gap-4 pb-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar">
                  <NewsCard data={newsItems} horizontal={true} />
                </div>
              </div>
              <div className="hidden md:block">
                <NewsCard data={newsItems} />
              </div>
            </>
          ) : (
            <p className="text-gray-500">No news articles available at the moment.</p>
          )}
        </div>
      </div>
    </section>
  )
}

