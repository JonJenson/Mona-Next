import './globals.css'
import 'boxicons/css/boxicons.min.css'
import { CartProvider } from '@/context/CartContext'
import { Poppins, Playfair_Display, Great_Vibes, Cormorant_Garamond } from 'next/font/google'

// Load Poppins and Playfair Display fonts
const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins'
})

const playfair = Playfair_Display({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-playfair'
})

const greatVibes = Great_Vibes({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-greatvibes'
})
const cormorantGaramond = Cormorant_Garamond({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-cormorant-garamond'
})

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <head>
        <link rel="icon" href="/favicon-new.jpg" /> {/* Link to the favicon */}
      </head>
      <body className={`${poppins.variable} ${playfair.variable} ${greatVibes.variable}`}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}
