import { useQuery } from "@tanstack/react-query";

import { useUserReportsStore } from "@/store/reportStore";
import { getAccessToken } from "@/store/authStore";
import { api } from "@/lib/axios";

const fetchUserReports = async () => {
  const { data } = await api.get("/reports/user-reports", {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });

  return data;
};

export const useUserReports = () => {
  const setReports = useUserReportsStore((state) => state.setReports);

  return useQuery({
    queryKey: ["user-reports"],
    queryFn: async () => {
      const reports = await fetchUserReports();

      setReports(reports);

      return reports;
    },
    staleTime: 1000 * 60 * 5,
  });
};
