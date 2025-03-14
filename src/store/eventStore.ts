import type { EventsItems } from "@/types/eventTypes";

import { create } from "zustand";

interface EventState {
  event: EventsItems;
  setEvents: (event: EventsItems) => void;
}

export const useEventsStore = create<EventState>((set) => ({
  event: [],
  setEvents: (event) => set({ event }),
}));
