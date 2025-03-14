"use client";

import type { NewsItems, NewsProps } from "@/types/newsTypes";

import { useState } from "react";

import { useUserNews } from "./useNews";

export function useNewsPage() {
  const { data } = useUserNews();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const categories = [
    "All",
    "ENVIRONMENT",
    "CONSERVATION",
    "EDUCATION",
    "RESEARCH",
  ];

  const newsArray: NewsItems = Array.isArray(data) ? data : [];

  const featuredNews: NewsProps | undefined =
    newsArray.length > 0 && !searchQuery && activeCategory === "All"
      ? newsArray[0]
      : undefined;

  const filteredNews = newsArray.filter((item: NewsProps) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeCategory === "All" || item.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const newsForPagination = featuredNews
    ? filteredNews.filter((item) => item.id !== featuredNews.id)
    : filteredNews;

  const totalItems = newsForPagination.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  const validCurrentPage = Math.min(currentPage, totalPages);

  if (validCurrentPage !== currentPage) {
    setCurrentPage(validCurrentPage);
  }

  const startIndex = (validCurrentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  const recentNews = newsForPagination.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    document
      .getElementById("news-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const clearFilters = () => {
    setSearchQuery("");
    setActiveCategory("All");
    setCurrentPage(1);
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
    currentPage,
    totalPages,
    onPageChange: handlePageChange,
  };
}
