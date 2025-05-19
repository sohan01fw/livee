import { useState } from "react";

export function useCarousel(itemCount: number) {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? itemCount - 1 : c - 1));
  const next = () => setCurrent((c) => (c === itemCount - 1 ? 0 : c + 1));

  return { current, prev, next };
}
