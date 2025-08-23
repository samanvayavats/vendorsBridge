// 'use client'
import Navbar from '@/components/navbar'
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SessionWrapper from "./component/SessionWrapper";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VendorsBridge",
  description: "empowering the local market",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressContentEditableWarning lang="en">
      <body 
        className={`${geistSans.variable} ${geistMono.variable} antialiased  bg-main`}
      >
        <SessionWrapper>
          {/* <main> */}
            <Navbar />
            {children}
          {/* </main> */}
        </SessionWrapper>
      </body>
    </html>
  );
}
