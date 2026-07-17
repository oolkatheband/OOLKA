import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Barlow, Barlow_Condensed } from 'next/font/google'
import './globals.css'

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-sans',
})

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-condensed',
})

// Ultimate SEO Metadata Configuration
export const metadata: Metadata = {
  metadataBase: new URL('https://oolkatheband.github.io/OOLKA'),
  title: {
    default: 'OOLKA PRODUCTIONS | Hard Rock & Metal',
    template: '%s | OOLKA'
  },
  description:
    'OOLKA is a relentless heavy hard rock and metal project collaborating with Ibn Khalid Khan and Rafsan Jani under OOLKA Productions. Operating since 2025 with blistering riffs, metallic dynamics, and dense atmospheric weight.',
  generator: 'v0.app',
  keywords: [
    'OOLKA', 
    'OOLKA band', 
    'Ibn Khalid Khan', 
    'OOLKA Productions', 
    'Rafsan Jani', 
    'Afia Ibnat Snigdha',
    'Bangladeshi Rock', 
    'Heavy Metal', 
    'Experimental Music', 
    'Brutalist Web Design'
  ],
  authors: [{ name: 'Ibn Khalid Khan' }, { name: 'OOLKA' }],
  creator: 'Ibn Khalid Khan',
  publisher: 'OOLKA Productions',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'OOLKA PRODUCTIONS | Official Website',
    description: 'Enter the sonic architecture of OOLKA Productions. Streaming singles, brutalist web design setups, and project archives.',
    url: 'https://oolkatheband.github.io/OOLKA/',
    siteName: 'OOLKA Productions',
    images: [
      {
        url: '/logo/oolka-logo-new.png',
        width: 1200,
        height: 630,
        alt: 'OOLKA Stark Brutalist Monochromatic Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OOLKA PRODUCTIONS | Official Website',
    description: 'Official archive of OOLKA Productions. Relentless heavy rock, metal dynamics, and design.',
    images: ['/logo/oolka-logo-new.png'],
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${barlow.variable} ${barlowCondensed.variable} bg-black`}>
      <head>
        {/* Schema.org MusicGroup Structured Data for Rich Search Previews */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'MusicGroup',
              'name': 'OOLKA',
              'url': 'https://oolkatheband.github.io/OOLKA/',
              'logo': 'https://oolkatheband.github.io/OOLKA/logo/oolka-logo-new.png',
              'genre': ['Hard Rock', 'Heavy Metal', 'Experimental Rock'],
              'foundingLocation': {
                '@type': 'Place',
                'name': 'Dhaka, Bangladesh'
              }
            }),
          }}
        />
      </head>
      <body className="antialiased font-sans">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
