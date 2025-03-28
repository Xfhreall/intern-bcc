"use client";

import { FeatureCard } from "@/components/ui/feature-card";
import { features } from "@/lib/featureDatas";

const About = () => {
  return (
    <section
      className="flex h-full max-h-[1296px] px-4 my-12 md:px-6 lg:px-8"
      id="about"
    >
      <div className="flex flex-col items-center gap-8 mx-auto lg:flex-row max-w-7xl">
        <div className="grid items-center justify-center w-full grid-cols-2 gap-6 lg:w-1/2">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        <div className="grid w-full gap-6 my-auto sm:gap-8 lg:w-1/2">
          <span className="space-y-2 sm:space-y-4">
            <h2 className="text-sm font-semibold sm:text-2xl">About</h2>
            <h3 className="text-2xl font-semibold sm:text-4xl">We Are Nautikara</h3>
          </span>
          <p className="font-[#757575] leading-relaxed sm:leading-loose font-light text-sm sm:text-base">
            <span className="font-bold">Nautikara</span> is a digital platform
            that connects people, communities and stakeholders in efforts to
            report pollution, conservation donations and marine environmental
            education. With transparent and accessible features, we encourage
            real action to keep marine ecosystems clean and sustainable.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
