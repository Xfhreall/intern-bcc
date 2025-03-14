"use client";

import { useQuery, useMutation } from "@tanstack/react-query";

import { fetchEvents } from "@/lib/eventDatas";
import { useEventsStore } from "@/store/eventStore";
import { EventsItems } from "@/types/eventTypes";

export const useUserEvents = () => {
  const setEvents = useEventsStore((state) => state.setEvents);

  return useQuery<EventsItems, Error>({
    queryKey: ["events"],
    queryFn: async () => {
      try {
        const data = await fetchEvents();

        setEvents(data.events);

        return data.events;
      } catch (error) {
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useEventsRefresh = () => {
  const setEvents = useEventsStore((state) => state.setEvents);

  return useMutation({
    mutationFn: fetchEvents,
    onSuccess: (data) => {
      setEvents(data.events);

      return data.events;
    },
  });
};
