"use client"

import Link from "next/link"
import Image from "next/image"
import { Search, Calendar, ChevronRight, User } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useNewsPage } from "@/hooks/useNewsPage"
import NewsCard from "@/components/ui/news-card"

export default function NewsPage() {
    const {
        searchQuery,
        setSearchQuery,
        activeCategory,
        setActiveCategory,
        categories,
        filteredNews,
        featuredNews,
        recentNews,
        clearFilters,
    } = useNewsPage()
    const [loading, setLoading] = useState(true);


    return (
        <div className="w-full min-h-screen mx-auto max-w-7xl">
            <div className="container grid w-full px-20 mx-auto pt-14">
                <div className="space-y-6">
                    <h1 className="text-xl font-semibold sm:text-3xl">
                        Latest News & Updates
                    </h1>
                    <p className="hidden text-sm sm:text-base opacity-60 md:block">
                        Stay updated with our latest news, announcements, and initiatives in marine conservation and environmental
                        protection.
                    </p>
                    <div className="grid w-full">
                        <div className="relative">
                            <Input
                                className="h-12 pl-10 text-sm text-gray-800 bg-white border border-gray-400 focus:ring-2 focus:ring-white"
                                placeholder="Search News"
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Search className="absolute w-5 h-5 text-gray-500 transform -translate-y-1/2 left-4 top-1/2" />
                        </div>
                        <div className="py-3 overflow-x-auto">
                            <div className="flex space-x-2 min-w-max">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === category
                                            ? "bg-primary text-white shadow-md"
                                            : "border-primary border text-primary hover:bg-secondary/20 hover:text-black"
                                            }`}
                                        onClick={() => setActiveCategory(category)}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container px-20 py-8 mx-auto">
                {filteredNews.length === 0 ? (
                    <div className="py-16 text-center bg-white shadow-sm rounded-xl">
                        <div className="flex items-center justify-center w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full">
                            <Search className="w-10 h-10 text-gray-400" />
                        </div>
                        <h2 className="mb-2 text-2xl font-semibold">No results found</h2>
                        <p className="mb-6 text-gray-600">{`We couldn't find any news matching "${searchQuery}"`}</p>
                        <Button className="px-6 rounded-full" onClick={clearFilters}>
                            Clear Search
                        </Button>
                    </div>
                ) : (
                    <>
                        {!searchQuery && activeCategory === "All" && (
                            <div className="mb-16">
                                <div className="flex items-center mb-6">
                                    <h2 className="text-2xl font-bold">Featured Story</h2>
                                    <div className="flex-grow h-px ml-4 bg-gray-300" />
                                </div>

                                <div className="overflow-hidden transition-shadow bg-white border shadow-lg rounded-xl hover:shadow-xl">
                                    <div className="grid gap-0 md:grid-cols-2">
                                        <div className="relative h-64 md:h-full">
                                            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 to-transparent md:hidden" />
                                            {loading && (<div className="absolute inset-0 bg-gray-500 rounded-xl animate-pulse" />)}
                                            <Image
                                                fill
                                                alt={featuredNews.title}
                                                className="object-cover"
                                                src={featuredNews.image.src}
                                                onLoad={() => setLoading(false)}
                                            />
                                            <div className="absolute z-10 bottom-4 right-4">
                                                <span className="px-3 py-1 text-sm font-medium text-white rounded-lg bg-primary">
                                                    {featuredNews.category}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col justify-center p-6 md:p-8">

                                            <h3 className="mb-4 text-2xl font-bold md:text-3xl">{featuredNews.title}</h3>
                                            <p className="hidden mb-6 text-gray-600 md:block">{featuredNews.description}</p>
                                            <div className="flex items-center mb-6 text-sm text-gray-500">
                                                <Calendar className="w-4 h-4 mr-1" />
                                                <span>{featuredNews.createdAt || "Recent"}</span>
                                                <span className="mx-2">•</span>
                                                <User className="w-4 h-4 mr-1" />
                                                <span>{featuredNews.author || "Admin"}</span>
                                            </div>
                                            <Button asChild className="px-6 rounded-lg w-fit">
                                                <Link href={`/news/${featuredNews.id}`}>
                                                    Read Full Article <ChevronRight className="w-4 h-4 ml-1" />
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div>
                            <div className="flex items-center mb-8">
                                <h2 className="text-2xl font-bold">
                                    {searchQuery || activeCategory !== "All" ? "Search Results" : "Latest Articles"}
                                </h2>
                                <div className="flex-grow h-px ml-4 bg-gray-300" />
                            </div>

                            <NewsCard data={recentNews} />
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

