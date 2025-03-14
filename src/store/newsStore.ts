import { create } from "zustand";

import { NewsProps } from "@/types/newsTypes";

interface NewsState {
  news: NewsProps[];
  setNews: (news: NewsProps[]) => void;
}

export const useNewsStore = create<NewsState>((set) => ({
  news: [],
  setNews: (news) => set({ news }),
}));
