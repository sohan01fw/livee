"use client";

import React, { useRef, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import CarouselItem from "./CarouselItem";
import { useCarousel } from "@/lib/hooks/useCarousel";

interface CarouselProps {
  items: ReactNode[];
  width: number;
  height?: number;
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "width" : "-width",
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction < 0 ? "width" : "-width",
    opacity: 0,
  }),
};

export const Carousel: React.FC<CarouselProps> = ({
  items,
  width,
  height = 300,
}) => {
  const { current, prev, next } = useCarousel(items.length);
  const directionRef = useRef(0);

  const paginate = (dir: number) => {
    directionRef.current = dir;
    if (dir > 0) next();
    else prev();
  };

  return (
    <div
      className="relative overflow-hidden ml-20 border border-white "
      style={{ width, height }}
    >
      <AnimatePresence custom={directionRef.current} initial={false}>
        <motion.div
          key={current}
          custom={directionRef.current}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5 }}
          className="absolute top-0 left-0"
        >
          <CarouselItem width={width}>{items[current]}</CarouselItem>
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-y-0 left-0 flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="p-2"
          onClick={() => paginate(-1)}
        >
          <ArrowLeft />
        </Button>
      </div>

      <div className="absolute inset-y-0 right-0 flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="p-2"
          onClick={() => paginate(1)}
        >
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
};
