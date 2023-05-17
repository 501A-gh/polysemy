import Image from "next/image";

const Wallpaper = ({ src }: { src: string | false }) => {
  return (
    <>
      {src && (
        <Image
          alt={"Wallpaper"}
          placeholder={"blur"}
          blurDataURL={src}
          src={src}
          width="0"
          height="0"
          sizes="100vw"
          className={`fixed w-full -z-10 h-screen object-cover`}
        />
      )}
    </>
  );
};

export default Wallpaper;
