import React from "react";

const Page = () => {
  return (
    <div className={`grid grid-cols-3 h-screen`}>
      <div className={`border-r border-r-gray-800 h-full`}>
        <div className={`py-5 border-b border-b-gray-800 border-dashed px-10`}>
          <h6 className={`font-serif`}>Polysemy Design Team</h6>
          <h1 className={`font-serif`}>Design Approach</h1>
        </div>
      </div>
      <div className={`border-r border-r-gray-800 h-full`}>
        <hr />
        <p className={`px-3`}>
          Polysemy is an experiment, with the goal of giving people the ability
          to interface with content (using accessible existing hardware) at
          wider and higher bandwidth.
        </p>
      </div>

      <div className={`border-r border-r-gray-800 h-full`}>
        <p className={`px-3`}>
          Polysemy is an experiment, with the goal of giving people the ability
          to interface with content (using accessible existing hardware) at
          wider and higher bandwidth.
        </p>
        <hr />
        <p className={`px-3`}>
          It is a natural language text editor, and takes pages from keyboard
          centric programming editors. These keyboard-based operations allow for
          a higher level of focus towards the content, allowing its wielder to
          focus on typing rather than clicking. This is why all functinalities
          on Polysemy are to be envoked via the keyboard.
          <br />
          <br />
          Combining this with useful features such as instant synonym search,
          the word cursor, and markdown based text editing all confined in one
          space, users will never need to touch their pointing device.
        </p>
      </div>
    </div>
  );
};

export default Page;
