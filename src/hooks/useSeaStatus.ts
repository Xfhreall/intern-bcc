import { useQuery, useMutation } from "@tanstack/react-query";

import { useReportsStore } from "@/store/reportStore";
import { internalApi } from "@/lib/axios";
import { getCredentialsData } from "@/store/authStore";

const fetchReports = async () => {
  const credentialsData = getCredentialsData();

  if (credentialsData === process.env.NEXT_PUBLIC_ADMIN_CREDENTIALS) {
    const { data } = await internalApi.get("/reports");

    return data;
  } else {
    const { data } = await internalApi.get("/reports/user-reports");

    return data;
  }
};

export const useUserReports = () => {
  const setReports = useReportsStore((state) => state.setReports);
  const mutation = useMutation({
    mutationFn: fetchReports,
    onSuccess: (data) => {
      setReports(data);

      return data;
    },
    onError: () => {
      return null;
    },
  });

  return useQuery({
    queryKey: ["reports"],
    queryFn: async () => {
      try {
        const result = await mutation.mutateAsync();

        return result;
      } catch (error) {
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useUserReportsSimple = () => {
  const setReports = useReportsStore((state) => state.setReports);

  return useMutation({
    mutationFn: fetchReports,
    onSuccess: (data) => {
      setReports(data);

      return data;
    },
    onError: () => {
      return null;
    },
  });
};
