import { StaticImageData } from "next/image";

export interface EventsProps {
  id: string;
  image: StaticImageData;
  title: string;
  description: string;
  date: string;
  location: string;
  createdAt: string;
}

export type EventsItems = EventsProps[];
