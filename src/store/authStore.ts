import type { AuthTokens, UserRegistrationData } from "@/types/authTypes";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  registrationData: UserRegistrationData | null;
  setRegistrationData: (data: UserRegistrationData) => void;
  clearRegistrationData: () => void;

  tokens: AuthTokens | null;
  setTokens: (tokens: AuthTokens) => void;
  clearTokens: () => void;

  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      registrationData: null,
      setRegistrationData: (data) => set({ registrationData: data }),
      clearRegistrationData: () => set({ registrationData: null }),

      tokens: null,
      setTokens: (tokens) => set({ tokens, isAuthenticated: true }),
      clearTokens: () => set({ tokens: null, isAuthenticated: false }),

      isAuthenticated: false,
      setIsAuthenticated: (value) => set({ isAuthenticated: value }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        registrationData: state.registrationData,
        tokens: state.tokens,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export const getAccessToken = () => {
  const tokenFromStore = useAuthStore.getState().tokens?.accessToken;

  if (!tokenFromStore) {
    return typeof window !== "undefined"
      ? localStorage.getItem("accessToken")
      : null;
  }

  return tokenFromStore;
};

export const getRefreshToken = () => {
  const tokenFromStore = useAuthStore.getState().tokens?.refreshToken;

  if (!tokenFromStore) {
    return typeof window !== "undefined"
      ? localStorage.getItem("refreshToken")
      : null;
  }

  return tokenFromStore;
};
