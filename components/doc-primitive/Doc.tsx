import { ClockIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

interface DocProps {
  title: string;
  date: string;
}

const Doc: React.FC<DocProps> = ({ title, date }) => {
  return (
    <Link
      href={`/editor`}
      className={`
        text-left w-full p-[1px] rounded-md 
        transition-all outline-none 
        border border-gray-300/90 dark:border-gray-800/90
        focus:border-gray-400/50
        focus:dark:border-gray-700

        focus:shadow-xl 
        focus:shadow-gray-200
        focus:dark:shadow-gray-900
        z-0
      `}
    >
      <div
        className={`
          bg-gradient-to-tr
          from-gray-300
          dark:from-gray-950
          to-gray-100
          dark:to-gray-900 gap-10
          transition-all
          animate-show h-fit w-full
          py-2 px-3 rounded-t-[4px] 
        `}
      >
        <h5 className={`font-serif m-0 font-medium`}>{title}</h5>
      </div>
      <section
        className={`
          flex items-center gap-1 text-xs
          backdrop-blur py-2 px-3
          rounded-b-[4px] bg-gray-200/80 dark:bg-gray-800/80 
          text-gray-600
          dark:text-gray-400
        `}
      >
        <ClockIcon className={`w-3 h-3`} />
        <time>{date}</time>
      </section>
    </Link>
  );
};

export default Doc;
