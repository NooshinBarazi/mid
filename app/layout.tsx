import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";


const inter = Inter({ subsets: ["latin"] });

const iranyekan = localFont({
  src: [
    {
      path: "../public/fonts/iranyekan/IRANYekanWebThin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/iranyekan/IRANYekanWebLight.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/iranyekan/IRANYekanWebRegular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/iranyekan/IRANYekanWebMedium.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/iranyekan/IRANYekanWebBold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/iranyekan/IRANYekanWebBlack.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-iranyekan",
});

export const metadata: Metadata = {
  title: "MID",
  description: "Image Processing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html dir="rtl" className={`${iranyekan.variable} ${inter.className}`}>
      <body>{children}</body>
    </html>
  );
}
