import "./globals.css";
import {
  Inter,
  Space_Mono,
  Playfair_Display,
  Inter_Tight,
  Space_Grotesk,
} from "next/font/google";

const inter = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-inter",
  display: "swap",
});
const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-spaceMono  ",
});
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-playfairDisplay",
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
        ${inter.variable}
        ${spaceMono.variable}
        ${playfairDisplay.variable}
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
    </html>
  );
}
