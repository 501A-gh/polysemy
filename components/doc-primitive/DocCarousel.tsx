import React from "react";

interface DocCarouselProps {
  children: JSX.Element[];
}

const DocCarousel: React.FC<DocCarouselProps> = ({ children }) => {
  return (
    <div style={{ perspective: "1000px" }}>
      <section className={`flex item-center justify-center`}>
        {children}
      </section>
    </div>
  );
};

export default DocCarousel;
