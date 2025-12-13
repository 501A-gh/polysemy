import NoSpaceScroll from "@/components/ui/NoScrollSpace";
import "./globals.css";
import { Ibarra_Real_Nova, DM_Sans, DM_Mono } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-dmSans",
  display: "swap",
});
const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dmMono",
});
const ibarraRealNova = Ibarra_Real_Nova({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibarraRealNova",
  display: "swap",
});

export const metadata = {
  title: "Polysemy.",
  description: "Block based text editor.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`
        ${dmSans.variable}
        ${dmMono.variable}
        ${ibarraRealNova.variable}
      `}
    >
      <body
        className={`
          bg-zinc-100
          dark:bg-zinc-950
          min-h-screen
        `}
      >
        {children}
      </body>
      <NoSpaceScroll />
    </html>
  );
}
