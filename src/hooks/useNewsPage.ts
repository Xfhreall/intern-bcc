"use client";

import { useState } from "react";

import { newsItems } from "@/lib/newsDatas";

export type NewsItem = {
  id: string;
  title: string;
  description: string;
  image: { src: string };
  category: string;
  date?: string;
  author?: string;
};

export function useNewsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    "Environment",
    "Conservation",
    "Education",
    "Research",
  ];

  const filteredNews = newsItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeCategory === "All" || item.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const featuredNews = newsItems[0];
  const recentNews = filteredNews.slice(
    searchQuery || activeCategory !== "All" ? 0 : 1
  );

  const clearFilters = () => {
    setSearchQuery("");
    setActiveCategory("All");
  };

  return {
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    categories,
    filteredNews,
    featuredNews,
    recentNews,
    clearFilters,
  };
}
