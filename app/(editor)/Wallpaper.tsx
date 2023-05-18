import Image from "next/image";

const Wallpaper = ({ src }: { src: string | false }) => {
  return (
    <>
      <div
        className={`fixed w-full h-screen object-cover backdrop-blur  -z-10`}
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
          className={`fixed w-full -z-20 h-screen object-cover`}
        />
      )}
    </>
  );
};

export default Wallpaper;
