"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react'
import { useParams } from "next/navigation"

import { newsItems, NewsProps } from "@/lib/newsDatas"
import { Button } from "@/components/ui/button"

export default function NewsArticlePage() {
    const params = useParams()
    const id = params.id as string

    const [article, setArticle] = useState<NewsProps | null>(null)
    const [loading, setLoading] = useState(true)
    const [relatedArticles, setRelatedArticles] = useState<NewsProps[]>([])

    useEffect(() => {
        const foundArticle = newsItems.find(item => item.id === id)

        if (foundArticle) {
            setArticle(foundArticle)

            const related = newsItems
                .filter(item => item.id !== id)
                .slice(0, 3)

            setRelatedArticles(related)
        }

        setLoading(false)
    }, [id])

    if (loading) {
        return (
            <div className="container max-w-4xl py-12 mx-auto">
                <div className="w-full h-64 bg-gray-200 rounded-lg animate-pulse" />
                <div className="w-3/4 h-10 mt-6 bg-gray-200 rounded animate-pulse" />
                <div className="w-full h-4 mt-4 bg-gray-200 rounded animate-pulse" />
                <div className="w-full h-4 mt-2 bg-gray-200 rounded animate-pulse" />
                <div className="w-full h-4 mt-2 bg-gray-200 rounded animate-pulse" />
            </div>
        )
    }

    if (!article) {
        return (
            <div className="container max-w-4xl py-12 mx-auto text-center">
                <h1 className="mb-4 text-2xl font-bold">Article Not Found</h1>
                <p className="mb-8 text-gray-600">The article you&apos;re looking for doesn&apos;t exist or has been removed.</p>
                <Button asChild>
                    <Link href="/news-page">Back to News</Link>
                </Button>
            </div>
        )
    }

    return (
        <div className="container max-w-4xl px-4 py-8 mx-auto md:py-12">
            <Link
                className="inline-flex items-center mb-6 text-sm font-medium text-primary hover:brightness-75"
                href="/news"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to News
            </Link>

            <article className="mb-12">
                <div className="relative w-full h-64 mb-6 overflow-hidden rounded-lg md:h-96">
                    <Image
                        fill
                        priority
                        alt={article.title}
                        className="object-cover"
                        src={article.image.src || "/placeholder.svg"}
                    />
                </div>

                <h1 className="mb-4 text-2xl font-bold text-gray-800 md:text-4xl">{article.title}</h1>

                <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-500">
                    <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1 text-primary" />
                        <span>{article.date || new Date().toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1 text-primary " />
                        <span>5 min read</span>
                    </div>
                    <div className="flex items-center">
                        <User className="w-4 h-4 mr-1 text-primary" />
                        <span>By {article.author || 'Admin'}</span>
                    </div>
                </div>

                <div className="prose max-w-none">
                    <p className="mb-4 leading-relaxed text-gray-700">{article.description}</p>

                    <div className="mb-4 leading-relaxed text-gray-700">
                        {article.content || (
                            <>
                                <p className="mb-4">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor.
                                </p>

                                <p className="mb-4">
                                    Suspendisse potenti. Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus. Praesent elementum hendrerit tortor. Sed semper lorem at felis.
                                </p>

                                <h2 className="mt-8 mb-4 text-xl font-bold text-gray-800">Key Highlights</h2>

                                <ul className="mb-6 ml-6 list-disc">
                                    <li className="mb-2">Vestibulum auctor dapibus neque.</li>
                                    <li className="mb-2">Nunc dignissim risus id metus.</li>
                                    <li className="mb-2">Cras ornare tristique elit.</li>
                                    <li className="mb-2">Vivamus vestibulum ntulla nec ante.</li>
                                </ul>

                                <p className="mb-4">
                                    Fusce lacinia arcu et nulla. Nulla vitae mauris non felis mollis faucibus. Phasellus hendrerit, magna vel pulvinar luctus, magna quam sodales eros, in vulputate sapien eros vel arcu. Curabitur vulputate, magna vel pulvinar luctus, magna quam sodales eros, in vulputate sapien eros vel arcu.
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </article>

            {relatedArticles.length > 0 && (
                <div className="pt-8 mt-12 border-t border-gray-200">
                    <h2 className="mb-6 text-2xl font-bold text-gray-800">Related News</h2>
                    <div className="grid gap-6 md:grid-cols-3">
                        {relatedArticles.map((item) => (
                            <article
                                key={item.id}
                                className="overflow-hidden transition-shadow bg-white border border-gray-200 rounded-lg hover:shadow-md"
                            >
                                <div className="grid h-full p-4 space-y-3">
                                    <div className="relative h-40">
                                        <Image
                                            fill
                                            alt={item.title}
                                            className="rounded-[10px] object-cover"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                                            src={item.image.src || "/placeholder.svg"}
                                        />
                                    </div>
                                    <h4 className="overflow-hidden text-sm font-bold text-ellipsis display-webkit-box -webkit-line-clamp-2 -webkit-box-orient-vertical">
                                        {item.title}
                                    </h4>
                                    <Link
                                        className="inline-flex items-center pt-4 text-sm font-medium text-primary hover:brightness-75"
                                        href={`/news/${item.id}`}
                                    >
                                        Read more <span className="ml-1">{">"}</span>
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
