import { type ImgHTMLAttributes, useEffect, useState } from "react";

type BlurImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src?: string;
};

export const BlurImage: React.FC<BlurImageProps> = (props) => {
  const [loading, setLoading] = useState(true);
  const [src, setSrc] = useState(props.src);

  useEffect(() => {
    setSrc(props.src);
    setLoading(true);
  }, [props.src]);

  return (
    <img
      {...props}
      src={src}
      alt={props.alt}
      className={`${props.className ?? ""} ${loading ? "blur-[2px]" : "blur-0"}`}
      onLoad={() => {
        setLoading(false);
      }}
      onError={() => {
        setSrc(`https://avatar.vercel.sh/${props.alt ?? "tweet"}`);
      }}
    />
  );
};
