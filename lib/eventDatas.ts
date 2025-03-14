import { internalApi } from "./axios";

export const fetchEvents = async () => {
  const { data } = await internalApi.get("/events");

  return data;
};
