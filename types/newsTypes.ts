import { StaticImageData } from "next/image";

export interface NewsProps {
  id: string;
  image: StaticImageData;
  title: string;
  description: string;
  date: string;
  author?: string;
  content?: string;
  category?: "Environment" | "Conservation" | "Education" | "Research";
}
