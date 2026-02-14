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
  title: "Moviecon",
  description: "Get latest Movies",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${Sora.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
