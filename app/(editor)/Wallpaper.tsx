import Image from "next/image";

const Wallpaper = ({ src }: { src: string | false }) => {
  return (
    <>
      <div
        className={`fixed w-full h-screen object-cover backdrop-blur -z-20 bg-gray-200/50
        dark:bg-gray-950/80`}
      ></div>
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
