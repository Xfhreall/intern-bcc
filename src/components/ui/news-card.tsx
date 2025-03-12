"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { NewsProps } from "@/lib/newsDatas";

const NewsCard = ({ data }: { data: NewsProps[] }) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="flex gap-6 pb-4 overflow-x-auto flex-nowrap md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-3">
      {data.map((item, index) => {
        return (
          <article
            key={index}
            className="min-w-[194px] w-[70%] sm:w-[280px] flex-shrink-0 overflow-hidden transition-shadow bg-white border border-gray-200 rounded-lg hover:shadow-md md:w-full"
          >
            <div className="grid h-full p-6 space-y-3">
              <div className="relative h-48 md:h-56 lg:h-64">
                {loading && (
                  <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-[10px]" />
                )}
                <Image
                  fill
                  alt={item.title}
                  className={`rounded-[10px] object-cover transition-opacity duration-300 ${loading ? "opacity-0" : "opacity-100"}`}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  src={item.image.src}
                  onLoad={() => setLoading(false)}
                />
              </div>
              <h4 className="overflow-hidden text-xs font-bold sm:text-xl text-ellipsis display-webkit-box -webkit-line-clamp-2 -webkit-box-orient-vertical">
                {item.title}
              </h4>
              <p className="overflow-hidden hidden sm:block text-[#212121] text-ellipsis display-webkit-box -webkit-line-clamp-3 -webkit-box-orient-vertical">
                {item.description}
              </p>
              <Link
                className="inline-flex items-center pt-6 font-medium text-primary hover:brightness-75"
                href={`/news/${item.id}`}
              >
                Read the full news <span className="ml-1">{">"}</span>
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default NewsCard;
