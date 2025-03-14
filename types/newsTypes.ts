import { StaticImageData } from "next/image";

export interface NewsProps {
  id: string;
  image: StaticImageData;
  title: string;
  description: string;
  createdAt: string;
  author?: string;
  content?: string;
  category?: string;
}
