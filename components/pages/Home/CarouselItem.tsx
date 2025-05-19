import React from "react";

interface CarouselItemProps {
  children: React.ReactNode;
  width: number;
}

const CarouselItem: React.FC<CarouselItemProps> = ({ children, width }) => {
  return (
    <div className="flex-shrink-0" style={{ width }}>
      {children}
    </div>
  );
};

export default CarouselItem;
