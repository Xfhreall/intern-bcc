"use client";

import type { NewsItems } from "@/types/newsTypes";

import { useQuery, useMutation } from "@tanstack/react-query";

import { useNewsStore } from "@/store/newsStore";
import { fetchNews } from "@/lib/newsDatas";

export const useUserNews = () => {
  const setNews = useNewsStore((state) => state.setNews);

  return useQuery<NewsItems, Error>({
    queryKey: ["news"],
    queryFn: async () => {
      try {
        const data = await fetchNews();

        setNews(data.news);

        return data.news;
      } catch (error) {
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useNewsRefresh = () => {
  const setNews = useNewsStore((state) => state.setNews);

  return useMutation({
    mutationFn: fetchNews,
    onSuccess: (data) => {
      setNews(data.news);

      return data.news;
    },
  });
};
