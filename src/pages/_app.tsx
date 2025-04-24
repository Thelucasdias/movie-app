import type { AppProps } from "next/app";
import { Geist, Geist_Mono } from "next/font/google";
import "../pages/styles/globals.css";
import { FavoritesProvider } from "@/contexts/FavoritesContext"; // importe o provider

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FavoritesProvider>
      <main
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Component {...pageProps} />
      </main>
    </FavoritesProvider>
  );
}
