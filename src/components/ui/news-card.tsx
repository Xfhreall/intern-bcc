"use client"

import type { NewsItems } from "@/types/newsTypes"
import type { NewsProps } from "@/types/newsTypes"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

import { formatDate } from "@/utils/format-date"

interface NewsCardProps {
  data: NewsItems
  horizontal?: boolean
}

const NewsCard = ({ data, horizontal = false }: NewsCardProps) => {
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({})

  if (!data || data.length === 0) {
    return (
      <div className="p-6 bg-gray-50 rounded-xl">
        <p className="text-gray-500">No news articles available.</p>
      </div>
    )
  }

  const handleImageLoad = (id: string) => {
    setLoadedImages((prev) => ({
      ...prev,
      [id]: true,
    }))
  }

  if (horizontal) {
    return (
      <>
        {data.map((item: NewsProps) => (
          <motion.article
            key={item.id}
            className="min-w-[280px] w-[280px] flex-shrink-0 overflow-hidden transition-all duration-300 bg-white shadow news-card rounded-xl hover:shadow-lg"
            initial={{ opacity: 0, x: 50 }}
            viewport={{ once: true }}
            whileInView={{
              opacity: 1,
              x: 0,
              transition: {
                duration: 0.5,
                ease: "easeOut",
              },
            }}
          >
            <div className="relative w-full h-48 overflow-hidden group">
              {!loadedImages[item.id] && <div className="absolute inset-0 bg-gray-500 rounded-t-xl animate-pulse" />}
              <Image
                fill
                alt={item.title || "News image"}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                src={item.image || "/placeholder.svg"}
                onLoad={() => handleImageLoad(item.id)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
              <div className="absolute z-10 bottom-4 left-4">
                <span className="px-3 py-1 text-xs font-medium text-white rounded-lg bg-primary">
                  {item.category || "News"}
                </span>
              </div>
            </div>
            <div className="grid p-6 h-fit">
              <h3 className="mb-3 text-base font-bold transition-colors line-clamp-2 hover:text-primary">
                <Link href={`/news/${item.id}`}>{item.title}</Link>
              </h3>
              <p className="mb-4 text-sm text-gray-600 line-clamp-2">{item.description}</p>
              <div className="flex flex-col items-start justify-between gap-2 pt-2 mt-auto">
                <div className="flex items-center text-xs text-gray-500">
                  <Calendar className="w-3 h-3 mr-1" />
                  <span>{formatDate(item.createdAt)}</span>
                </div>
                <Link
                  className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                  href={`/news/${item.id}`}
                >
                  Read more <ArrowRight className="w-3 h-3 ml-1" />
                </Link>
              </div>
            </div>
          </motion.article>
        ))}
      </>
    )
  }

  return (
    <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-3">
      {data.map((item: NewsProps) => (
        <motion.article
          key={item.id}
          className="w-full max-w-2xl overflow-hidden transition-all duration-300 bg-white shadow news-card rounded-xl hover:shadow-lg"
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
            {!loadedImages[item.id] && <div className="absolute inset-0 bg-gray-500 rounded-xl animate-pulse" />}
            <Image
              fill
              alt={item.title || "News image"}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              src={item.image || "/placeholder.svg"}
              onLoad={() => handleImageLoad(item.id)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
            <div className="absolute z-10 bottom-4 left-4">
              <span className="px-3 py-1 text-xs font-medium text-white rounded-lg bg-primary">
                {item.category || "News"}
              </span>
            </div>
          </div>
          <div className="grid p-6 h-fit">
            <h3 className="mb-3 text-base font-bold transition-colors md:text-xl line-clamp-3 md:line-clamp-2 hover:text-primary">
              <Link href={`/news/${item.id}`}>{item.title}</Link>
            </h3>
            <p className="hidden mb-4 text-gray-600 sm:block line-clamp-3">{item.description}</p>
            <div className="flex flex-col items-start justify-between gap-4 pt-4 mt-auto md:gap-2 sm:items-center sm:flex-row">
              <div className="flex items-center text-xs text-gray-500 md:text-sm">
                <Calendar className="w-4 h-4 mr-1" />
                <span>{formatDate(item.createdAt)}</span>
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
  )
}

export default NewsCard

