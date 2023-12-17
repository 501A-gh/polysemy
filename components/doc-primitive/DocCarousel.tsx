import React from "react";

const DocCarousel: React.FC<{
  children: JSX.Element[];
}> = ({ children }) => {
  return (
    <div style={{ perspective: "1000px" }}>
      <section className={`flex item-center justify-center`}>
        {children}
      </section>
    </div>
  );
};

export default DocCarousel;
