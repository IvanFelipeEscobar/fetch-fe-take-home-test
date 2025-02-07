import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Fetch - Front end take home test',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100 flex justify-center items-center">
        {children}
      </body>
    </html>
  )
}
