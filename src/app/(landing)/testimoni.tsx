"use client";

import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";

import { TestimonialCard } from "@/components/ui/testi-card";

const testimonials = [
  {
    text: "AQUAVERSE is a game-changer! It bridges the gap between environmental issues and real action.",
    author: "Emma Richardson",
    role: "Marine Biologist",
    colorScheme: "blue" as const,
  },
  {
    text: "Finally, a platform that not only spreads awareness but also enables real contributions. The donation transparency.",
    author: "Michael Carter",
    role: "Environmental Activist",
    colorScheme: "green" as const,
  },
  {
    text: "Through AQUAVERSE, I was able to organize a coastal clean-up event that reached a wide audience.",
    author: "Sophia",
    role: "Eco Tourism Business Owner",
    colorScheme: "blue" as const,
  },
  {
    text: "AQUAVERSE is a game-changer! It bridges the gap between environmental issues and real action.",
    author: "Emma Richardson",
    role: "Marine Biologist",
    colorScheme: "blue" as const,
  },
  {
    text: "Finally, a platform that not only spreads awareness but also enables real contributions. The donation transparency.",
    author: "Michael Carter",
    role: "Environmental Activist",
    colorScheme: "green" as const,
  },
];

const duplicatedTestimonials = [...testimonials, ...testimonials];

export const Testimoni = () => {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimationControls();

  const cardWidth = 350 + 32;
  const totalWidth = testimonials.length * cardWidth;

  useEffect(() => {
    controls.start({
      x: -totalWidth,
      transition: {
        duration: 30,
        ease: "linear",
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
      },
    });
  }, [controls, totalWidth]);

  useEffect(() => {
    if (isHovered) {
      controls.stop();
    } else {
      controls.start({
        x: -totalWidth,
        transition: {
          duration: 30,
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
        },
      });
    }
  }, [isHovered, controls, totalWidth]);

  return (
    <section
      className="px-4 py-16 overflow-hidden md:px-6 lg:px-8"
      id="testimoni"
    >
      <div className="mx-auto mb-12 max-w-7xl">
        <h2 className="mb-2 text-lg font-semibold text-gray-600">
          Testimonial
        </h2>
        <div className="flex items-center justify-between">
          <h3 className="text-4xl font-bold text-gray-900">
            What They Say About Us
          </h3>
        </div>
      </div>

      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="overflow-hidden">
          <motion.div
            animate={controls}
            className="flex"
            style={{
              width: "fit-content",
            }}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                author={testimonial.author}
                colorScheme={testimonial.colorScheme}
                rating={4}
                role={testimonial.role}
                text={testimonial.text}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
