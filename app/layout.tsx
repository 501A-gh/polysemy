import './globals.css'
import { Inter, Space_Mono, Playfair_Display } from 'next/font/google'
const inter = Inter({
  subsets: ['latin'],
  weight:['400','700'],
  variable:'--font-inter'
})
const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight:['400','700'],
  variable:'--font-spaceMono  '
})
const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight:['400','500','600'],
  variable:'--font-playfairDisplay'
})

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
    <html
      lang="en"
      className={`
      bg-gray-950
        ${inter.variable}
        ${spaceMono.variable}
        ${playfairDisplay.variable}
      `}
    >
      <body>
        {children}
      </body>
    </html>
  )
}
