import type { NewsItems } from "@/types/newsTypes";

import { create } from "zustand";

interface NewsState {
  news: NewsItems;
  setNews: (news: NewsItems) => void;
}

export const useNewsStore = create<NewsState>((set) => ({
  news: [],
  setNews: (news) => set({ news }),
}));
