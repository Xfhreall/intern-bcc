import { Suspense } from "react";

import About from "./(landing)/about";
import { Banner } from "./(landing)/banner";
import Hero from "./(landing)/hero";
import { News } from "./(landing)/news";
import { Services } from "./(landing)/service";
import { Testimoni } from "./(landing)/testimoni";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
  AboutSkeleton,
  BannerSkeleton,
  HeroSkeleton,
  NewsSkeleton,
  ServicesSkeleton,
  TestimoniSkeleton,
} from "@/components/skeletons-landing";

export default function Home() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<HeroSkeleton />}>
        <Hero />
      </Suspense>
      <Suspense fallback={<AboutSkeleton />}>
        <About />
      </Suspense>
      <Suspense fallback={<ServicesSkeleton />}>
        <Services />
      </Suspense>
      <Suspense fallback={<TestimoniSkeleton />}>
        <Testimoni />
      </Suspense>
      <Suspense fallback={<BannerSkeleton />}>
        <Banner />
      </Suspense>
      <Suspense fallback={<NewsSkeleton />}>
        <News />
      </Suspense>
      <Footer />
    </>
  );
}
