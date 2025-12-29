import type { Metadata } from "next";
import { Inter, Outfit, Oswald } from "next/font/google"; // Using better fonts
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getMenu } from "@/lib/content";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });

export const metadata: Metadata = {
  title: "Virtus Velletri Basket",
  description: "Sito ufficiale della s.s.dil. Virtus Velletri. Storia, Squadre e Passione.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const menu = getMenu();

  return (
    <html lang="it">
      <body
        className={`${inter.variable} ${outfit.variable} ${oswald.variable} antialiased bg-gray-50 text-gray-900 font-sans`}
      >
        <Navbar menu={menu} />
        <main className="pt-20 min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
