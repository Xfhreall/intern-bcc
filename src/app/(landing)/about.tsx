"use client";

import {
  PlayIcon,
  BagIcon,
  CheckIcon,
  ReportIcon,
} from "@/public/icon/aboutIcon";
import { FeatureCard } from "@/components/ui/feature-card";

const About = () => {
  const features = [
    {
      icon: PlayIcon,
      title: "Easy to Contribute",
      description:
        "Reports and donations are transparent, everyone can participate.",
      iconColor: "text-[#0288D1]",
    },
    {
      icon: CheckIcon,
      title: "Real Impact",
      description:
        "Every report is followed up by a community of trusted partners.",
      iconColor: "text-[#4CAF50]",
    },
    {
      icon: BagIcon,
      title: "Donation Transparency",
      description: "You can see how your donation is used.",
      iconColor: "text-[#FFC107]",
    },
    {
      icon: ReportIcon,
      title: "Access News & Events",
      description: "Follow conservation news and activities easily.",
      iconColor: "text-[#F44336]",
    },
  ];

  return (
    <section
      className="flex h-full max-h-[1296px] px-4 my-12 md:px-6 lg:px-8"
      id="about"
    >
      <div className="flex flex-col items-center gap-8 mx-auto lg:flex-row max-w-7xl">
        <div className="grid items-center justify-center w-full gap-6 lg:w-1/2 sm:grid-cols-2">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        <div className="grid w-full gap-8 my-auto lg:w-1/2">
          <span className="space-y-4">
            <h2 className="text-2xl font-medium">About</h2>
            <h3 className="text-4xl font-bold">What is NAUTIKARA?</h3>
          </span>
          <p className="font-light leading-loose">
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
