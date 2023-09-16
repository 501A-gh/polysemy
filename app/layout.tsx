import NoSpaceScroll from "@/components/ui/NoScrollSpace";
import "./globals.css";
import { Space_Mono, Space_Grotesk, Ibarra_Real_Nova } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-spaceGrotesk",
  display: "swap",
});
const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-spaceMono  ",
});
const ibarraRealNova = Ibarra_Real_Nova({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
        ${spaceGrotesk.variable}
        ${spaceMono.variable}
        ${ibarraRealNova.variable}
      `}
    >
      <body
        className={`
          bg-gray-100
          dark:bg-gray-950
          min-h-screen
        `}
      >
        {children}
      </body>
      <NoSpaceScroll />
    </html>
  );
}
