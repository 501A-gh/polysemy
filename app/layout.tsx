import './globals.css'

export const metadata = {
  title: 'Polysemy.',
  description: 'Block based text editor.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
