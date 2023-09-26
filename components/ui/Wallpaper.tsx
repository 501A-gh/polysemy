import Image from "next/image";
import React from "react";

interface WallpaperProps {
  src: string | false;
}

const Wallpaper: React.FC<WallpaperProps> = ({ src }) => {
  return (
    <>
      <div
        className={`
          transition-all
          fixed
          w-full
          h-screen
          object-cover
          -z-20
          bg-zinc-200/50
          dark:bg-zinc-950/80
        `}
      />
      {src && (
        <Image
          alt={"Wallpaper"}
          placeholder={"blur"}
          blurDataURL={src}
          src={src}
          width="0"
          height="0"
          sizes="100vw"
          className={`fixed w-full -z-30 h-screen object-cover`}
        />
      )}
    </>
  );
};

export default Wallpaper;
