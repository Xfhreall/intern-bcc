import { internalApi } from "./axios";

export const fetchNews = async () => {
  const { data } = await internalApi.get("/news");

  return data;
};
