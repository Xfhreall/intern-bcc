"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Search, Calendar, ArrowRight, ChevronRight, Tag, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useNewsPage } from "@/hooks/useNewsPage"

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

    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-white to-gray-50">
            <div className="relative text-white bg-primary">
                <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-20 bg-cover bg-center" />
                <div className="container relative px-4 py-16 mx-auto md:py-24">
                    <div className="max-w-3xl">
                        <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
                            Latest <span className="text-primary-foreground">News</span> & Updates
                        </h1>
                        <p className="max-w-2xl mb-8 text-lg md:text-xl opacity-90">
                            Stay updated with our latest news, announcements, and initiatives in marine conservation and environmental
                            protection.
                        </p>
                        <div className="relative max-w-md">
                            <Input
                                className="h-12 pl-10 text-gray-800 border-0 rounded-full shadow-lg bg-white/90 focus:ring-2 focus:ring-white"
                                placeholder="Search news..."
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Search className="absolute w-5 h-5 text-gray-500 transform -translate-y-1/2 left-4 top-1/2" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container px-4 py-12 mx-auto">
                <div className="pb-2 mb-10 overflow-x-auto">
                    <div className="flex space-x-2 min-w-max">
                        {categories.map((category) => (
                            <button
                                key={category}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === category
                                    ? "bg-primary text-white shadow-md"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                                onClick={() => setActiveCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

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
                                    <div className="flex-grow h-px ml-4 bg-gray-200" />
                                </div>

                                <div className="overflow-hidden transition-shadow bg-white shadow-lg rounded-2xl hover:shadow-xl">
                                    <div className="grid gap-0 md:grid-cols-2">
                                        <div className="relative h-64 md:h-full">
                                            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 to-transparent md:hidden" />
                                            <Image
                                                fill
                                                alt={featuredNews.title}
                                                className="object-cover"
                                                src={featuredNews.image.src || "/placeholder.svg"}
                                            />
                                        </div>
                                        <div className="flex flex-col justify-center p-6 md:p-8">
                                            <div className="flex items-center mb-3 text-sm text-primary">
                                                <Tag className="w-4 h-4 mr-1" />
                                                <span>{featuredNews.category}</span>
                                            </div>
                                            <h3 className="mb-4 text-2xl font-bold md:text-3xl">{featuredNews.title}</h3>
                                            <p className="mb-6 text-gray-600">{featuredNews.description}</p>
                                            <div className="flex items-center mb-6 text-sm text-gray-500">
                                                <Calendar className="w-4 h-4 mr-1" />
                                                <span>{featuredNews.date || "Recent"}</span>
                                                <span className="mx-2">•</span>
                                                <User className="w-4 h-4 mr-1" />
                                                <span>{featuredNews.author || "Admin"}</span>
                                            </div>
                                            <Button asChild className="px-6 rounded-full w-fit">
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
                                <div className="flex-grow h-px ml-4 bg-gray-200" />
                            </div>

                            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                                {recentNews.map((item, _index) => (
                                    <motion.article
                                        key={item.id}
                                        className="overflow-hidden transition-all duration-300 bg-white shadow news-card rounded-xl hover:shadow-lg"
                                        initial={{ opacity: 0, y: 50 }}
                                        viewport={{ once: true }}
                                        whileInView={{
                                            opacity: 1,
                                            y: 0,
                                            transition: {
                                                duration: 0.5,
                                                ease: "easeOut",
                                            },
                                        }}
                                    >
                                        <div className="relative w-full h-48 overflow-hidden group">
                                            <Image
                                                fill
                                                alt={item.title}
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                src={item.image.src || "/placeholder.svg"}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                                            <div className="absolute z-10 bottom-4 left-4">
                                                <span className="px-3 py-1 text-xs font-medium text-white rounded-full bg-primary">
                                                    {item.category}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <h3 className="mb-3 text-xl font-bold transition-colors line-clamp-2 hover:text-primary">
                                                <Link href={`/news/${item.id}`}>{item.title}</Link>
                                            </h3>
                                            <p className="mb-4 text-gray-600 line-clamp-3">{item.description}</p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center text-sm text-gray-500">
                                                    <Calendar className="w-4 h-4 mr-1" />
                                                    <span>{item.date || "Recent"}</span>
                                                </div>
                                                <Link
                                                    className="inline-flex items-center font-medium text-primary hover:underline"
                                                    href={`/news/${item.id}`}
                                                >
                                                    Read more <ArrowRight className="w-4 h-4 ml-1" />
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.article>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

