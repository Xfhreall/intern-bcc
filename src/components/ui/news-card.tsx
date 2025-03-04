import React from "react";
import Link from "next/link";
import Image from "next/image";

import { NewsProps } from "@/lib/newDatas";

const NewsCard = ({ data }: { data: NewsProps[] }) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {data.map((item, index) => (
        <article
          key={index}
          className="overflow-hidden transition-shadow bg-white border border-gray-200 rounded-lg hover:shadow-md"
        >
          <div className="grid h-full p-6 space-y-3">
            <div className="relative h-48 md:h-56 lg:h-64">
              <Image
                fill
                alt={item.title}
                className="object-cover rounded-[10px]"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                src={item.image}
              />
            </div>
            <h4 className="overflow-hidden text-xl font-bold text-ellipsis display-webkit-box -webkit-line-clamp-2 -webkit-box-orient-vertical">
              {item.title}
            </h4>
            <p className="overflow-hidden text-gray-600 text-ellipsis display-webkit-box -webkit-line-clamp-3 -webkit-box-orient-vertical">
              {item.description}
            </p>
            <Link
              className="inline-flex items-center font-medium text-primary hover:brightness-75"
              href={item.link}
            >
              Read the full news <span className="ml-1">{">"}</span>
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
};

export default NewsCard;
