import About from "./(landing)/about";
import { Banner } from "./(landing)/banner";
import Hero from "./(landing)/hero";
import { News } from "./(landing)/news";
import { Services } from "./(landing)/service";
import { Testimoni } from "./(landing)/testimoni";

import { Navbar } from "@/components/navbar";
export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Testimoni />
      <Banner />
      <News />
    </>
  );
}
