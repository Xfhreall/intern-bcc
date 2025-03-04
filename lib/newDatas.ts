import { StaticImageData } from "next/image";

import one from "@/public/assets/news/one.svg";
import two from "@/public/assets/news/two.svg";
import three from "@/public/assets/news/three.svg";

export interface NewsProps {
  image: StaticImageData;
  title: string;
  description: string;
  link: string;
}

export const newsItems: NewsProps[] = [
  {
    image: one,
    title: "Coastal Cleanup: 500+ kg of Waste Collected!",
    description:
      "Volunteers gathered at Bali's shoreline, removing plastic waste and protecting marine life. This initiative was supported by community do....",
    link: "#",
  },
  {
    image: two,
    title: "New Partnership with Ocean Guardians!",
    description:
      "Nautikara is now collaborating with Ocean Guardians to expand conservation efforts. More cleanup events and awareness campaigns co....",
    link: "#",
  },
  {
    image: three,
    title: "Microplastic Levels in Coral Reefs Rising",
    description:
      "Recent studies reveal an alarming increase in microplastic pollution in coral ecosystems. Learn how you can help reduce plastic waste!",
    link: "#",
  },
];
