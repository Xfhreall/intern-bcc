import { useMutation } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/store/authStore";
export function useLogout() {
  const router = useRouter();
  const clearTokens = useAuthStore((state) => state.clearTokens);
  const clearDatas = useAuthStore((state) => state.clearRegistrationData);

  return useMutation({
    mutationFn: async () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      clearTokens();
      clearDatas();
      await signOut({ redirect: false });
    },
    onSuccess: () => {
      router.push("/");
    },
  });
}
