import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Willow Creek Ranch | Luxury Equestrian Experiences",
  description:
    "A private ranch experience for scenic trail rides, trusted lessons, boarding, camps, and celebrations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
