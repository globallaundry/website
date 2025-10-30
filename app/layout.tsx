// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";   // 👈 added
import Footer from "../components/Footer";   // 👈 already exists

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Global Laundry™",
  description:
    "Door-to-door laundry & dry cleaning across Beirut & Metn. Fast pickup, professional cleaning, and reliable delivery.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex min-h-screen flex-col`}
      >
        {/* 👇 ADD HEADER RIGHT HERE, ABOVE MAIN */}
        <Header />

        {/* 👇 MAIN CONTENT (all pages render here) */}
        <main className="flex-grow">{children}</main>

        {/* 👇 FOOTER AT THE BOTTOM */}
        <Footer />
      </body>
    </html>
  );
}
