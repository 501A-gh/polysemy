export const metadata = {
  title: "About",
  description: "What is Polysemy?",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className={`mx-10`}>{children}</section>;
}
