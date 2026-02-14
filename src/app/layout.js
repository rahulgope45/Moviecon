import { Geist, Geist_Mono,Sora as SoraFont  } from "next/font/google";
import "./globals.css";

const Sora = SoraFont({
  variable: "--font-sora",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: 'MovieFinder - Discover Movies',
    template: '%s | MovieFinder'
  },
  description: 'Discover the latest movies, search for your favorites, and explore detailed information about films, cast, and ratings.',
  keywords: ['movies', 'film database', 'movie search', 'movie ratings', 'cinema'],
  authors: [{ name: 'Your Name' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yourdomain.com',
    siteName: 'MovieFinder',
    images: [
      {
        url: 'https://yourdomain.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'MovieFinder - Discover Movies',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MovieFinder - Discover Movies',
    description: 'Discover the latest movies, search for your favorites',
    images: ['https://yourdomain.com/og-image.jpg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}