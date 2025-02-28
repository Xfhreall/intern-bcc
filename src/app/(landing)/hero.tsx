"use client";
import Image from "next/image";

import bg from "@/public/bg/heroBg.svg";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="flex items-center justify-center w-full min-h-[600px] px-8">
      <div className="relative w-full max-w-7xl rounded-[10px] overflow-hidden">
        <div className="relative w-full h-[600px]">
          <Image
            fill
            priority
            alt="Ocean background with school of fish"
            className="object-cover"
            sizes="(max-width: 1280px) 100vw, 1296px"
            src={bg}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        </div>

        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16">
          <div className="max-w-2xl space-y-6">
            <h1 className="text-2xl font-medium tracking-wide text-white sm:text-5xl md:text-6xl">
              Save the Ocean,
              <br />
              Save the Future!
            </h1>
            <p className="text-sm text-white/90 md:text-xl">
              Join in real action to protect the marine ecosystem!
            </p>
            <Button
              className="px-8 py-6 text-lg text-white bg-primary hover:bg-secondary"
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
