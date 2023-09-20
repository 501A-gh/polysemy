import React from "react";

const Page = () => {
  return (
    <main>
      <hgroup className={`px-10 py-5`}>
        <h6 className={`font-serif`}>Polysemy Design Team</h6>
        <h1 className={`font-serif`}>Design Approach</h1>
      </hgroup>
      <hr />
      <div className={`px-10 py-5`}>
        <p>
          Polysemy is an experiment, with the goal of giving people the ability
          to interface with content (using accessible existing hardware) at
          wider and higher bandwidth.
        </p>
        <p>
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
    </main>
  );
};

export default Page;
