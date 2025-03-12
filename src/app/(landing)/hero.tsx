"use client";
import Image from "next/image";

import bg from "@/public/bg/heroBg.svg";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="flex items-center justify-center mt-6 w-full h-full sm:min-h-[600px] px-8">
      <div className="relative w-full max-w-7xl rounded-[10px] overflow-hidden">
        <div className="relative w-full h-[327px] sm:h-[600px]">
          <Image
            fill
            priority
            alt="Ocean background"
            className="object-cover"
            sizes="(max-width: 1280px) 100vw, 1296px"
            src={bg}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 sm:from-black/60 to-transparent" />
        </div>

        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16">
          <div className="max-w-2xl space-y-6">
            <div className="space-y-2 ">
              <h1 className="text-2xl font-semibold tracking-wide text-white sm:text-5xl md:text-6xl">
                Save the Ocean,
              </h1>
              <h1 className="text-2xl font-semibold tracking-wide text-white sm:text-5xl md:text-6xl">
                Save the Future!
              </h1>
            </div>
            <p className="text-xs w-[227px] sm:w-full font-extralight text-white/90 md:text-xl">
              Join in real action to protect the marine ecosystem!
            </p>
            <Button
              className="px-6 py-2 text-xs font-medium sm:font-semibold sm:px-10 sm:py-6 sm:text-md bg-primary hover:bg-secondary"
              size="lg"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
