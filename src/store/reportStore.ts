// src/store/useUserReportsStore.ts
import { create } from "zustand";

import { Reports } from "@/types/reportTypes";

interface UserReportsState {
  reports: Reports[];
  setReports: (reports: any[]) => void;
}

export const useUserReportsStore = create<UserReportsState>((set) => ({
  reports: [],
  setReports: (reports) => set({ reports }),
}));
