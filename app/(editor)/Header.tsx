"use client";
import { Tab } from "../../components/Tab";

const Header = ({ children }: { children?: JSX.Element | JSX.Element[] }) => {
  return (
    <header
      className={`
          z-10 sticky top-0
          print:hidden select-none
          border-b border-b-gray-300
          bg-gray-100 dark:border-b-gray-800 dark:bg-gray-950
        `}
    >
      <section className={`flex items-center justify-between`}>
        <div className={`flex items-center`}>
          <Tab focus>Untitled</Tab>
          {/* <Tab focus={false}>Docs</Tab>
          <Tab focus={false}>Add Tokens</Tab>
          <Tab focus={false}>Import</Tab>
          <Tab focus={false}>Export</Tab> */}
        </div>

        <div
          className={`
              bg-gradient-to-tr 
              from-gray-800 
              to-gray-950
              focus:outline-none
              p-1
            `}
        >
          <h1
            className={`
                text-sm mx-2 my-0
                whitespace-nowrap
                text-white font-serif
              `}
          >
            Polysemy.
          </h1>
        </div>
      </section>
      {children}
    </header>
  );
};

export default Header;
