import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chess Learning App",
  description: "Learn chess openings and defend against common traps",
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
