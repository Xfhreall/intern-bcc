"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import { NewsProps } from "@/types/newsTypes";

const NewsCard = ({ data }: { data: NewsProps[] }) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="grid grid-cols-3 gap-8">
      {data.map((item, _index) => (
        <motion.article
          key={item.id}
          className="max-w-2xl overflow-hidden transition-all duration-300 bg-white shadow w-52 md:w-full news-card rounded-xl hover:shadow-lg"
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
            {loading && (<div className="absolute inset-0 bg-gray-500 rounded-xl animate-pulse" />)}
            <Image
              fill
              alt={item.title}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              src={item.image.src || "/placeholder.svg"}
              onLoad={() => setLoading(false)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
            <div className="absolute z-10 bottom-4 left-4">
              <span className="px-3 py-1 text-xs font-medium text-white rounded-lg bg-primary">
                {item.category}
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
                <span>{item.createdAt || "Recent"}</span>
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
  );
};

export default NewsCard;
