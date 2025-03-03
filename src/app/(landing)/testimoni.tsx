"use client";

import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";

import { TestimonialCard } from "@/components/ui/testi-card";
import { testimonials } from "@/lib/testiDatas";

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
    <section className="py-16 overflow-hidden" id="testimoni">
      <div className="mx-auto mb-12 space-y-4 text-center">
        <h2 className="mb-2 text-lg font-semibold text-gray-600">
          Testimonial
        </h2>
        <h3 className="text-4xl font-bold text-gray-900">
          What They Say About Us
        </h3>
      </div>

      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="overflow-hidden">
          <motion.div
            animate={controls}
            className="flex "
            style={{
              width: "fit-content",
            }}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                author={testimonial.author}
                avatarUrl={testimonial.avatar}
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
