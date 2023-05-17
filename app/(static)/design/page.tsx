import React from "react";

const Page = () => {
  return (
    <div className={`my-5 w-80`}>
      <h1 className={`font-serif`}>Design Approach</h1>
      <p>
        Polysemy takes a page from text editors like Vim that are centered
        around keyboard-based operations. All functinalities on Polysemy are to
        be envoked via the users keyboard, allowing its wielder to focus on
        typing rather than clicking.
        <br />
        <br />
        Combining this with useful features such as instant synonym search, the
        word cursor, and markdown based text editing all confined in one space,
        users will never need to touch their mouse.
      </p>
    </div>
  );
};

export default Page;
