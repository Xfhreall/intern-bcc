import About from "./(landing)/about";
import Hero from "./(landing)/hero";
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
    </>
  );
}
