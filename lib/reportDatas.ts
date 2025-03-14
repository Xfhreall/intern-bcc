import { internalApi } from "./axios";

import { getCredentialsData } from "@/store/authStore";
export const fetchReports = async () => {
  const credentialsData = getCredentialsData();

  if (credentialsData === process.env.NEXT_PUBLIC_ADMIN_CREDENTIALS) {
    const { data } = await internalApi.get("/reports");

    return data;
  } else {
    const { data } = await internalApi.get("/reports/user-reports");

    return data;
  }
};
