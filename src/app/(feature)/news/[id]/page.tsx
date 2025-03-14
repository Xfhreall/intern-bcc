"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react'
import { useParams } from "next/navigation"

import { useUserNews } from "@/hooks/useNews"
import { NewsProps } from "@/types/newsTypes"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/utils/format-date"
import NewsCard from "@/components/ui/news-card"
import { getAccessToken } from "@/store/authStore"

export default function NewsArticlePage() {
    const token = getAccessToken()
    const params = useParams();
    const id = params.id as string;
    const { data, isLoading } = useUserNews();

    const [article, setArticle] = useState<NewsProps | null>(null);
    const [relatedArticles, setRelatedArticles] = useState<NewsProps[]>([]);

    useEffect(() => {
        if (!data || isLoading) return;
        const foundArticle = data.find((item) => item.id === id);

        if (foundArticle) {
            setArticle(foundArticle);

            const related = data.filter((item) => item.id !== id).slice(0, 3);

            setRelatedArticles(related);
        }

    }, [id, data, isLoading]);


    if (isLoading) {
        return (
            <div className="container h-screen max-w-4xl py-12 mx-auto">
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
                    <Link href="/news">Back to News</Link>
                </Button>
            </div>
        )
    }

    return (
        <div className="container px-4 py-8 mx-auto mb-auto max-w-7xl md:py-12">
            <div className="flex items-center justify-between w-full mb-6">
                <Link
                    className="inline-flex items-center text-sm font-medium text-primary hover:brightness-75"
                    href="/news"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to News
                </Link>
                {token ? (<Button asChild ><Link href="/dashboard/news"> Back to dashboard</Link></Button>) : null}
            </div>

            <article className="mb-12">
                <div className="relative w-full h-64 mb-6 overflow-hidden rounded-lg md:h-96">
                    <Image
                        fill
                        priority
                        alt={article.title}
                        className="object-cover"
                        src={article.image}
                    />
                </div>

                <h1 className="mb-4 text-2xl font-bold text-gray-800 md:text-4xl">{article.title}</h1>

                <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-500">
                    <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1 text-primary" />
                        <span>{formatDate(article.createdAt) || new Date().toLocaleDateString()}</span>
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
                <div className="w-full pt-8 mt-12 border-t border-gray-200">
                    <h2 className="mb-6 text-2xl font-bold text-gray-800">Related News</h2>
                    <NewsCard data={relatedArticles} />
                </div>
            )}
        </div>
    )
}
