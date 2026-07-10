import type { Metadata } from "next";
import { Lora, Source_Sans_3, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-lora",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-source-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "QR Menü",
  description: "Şubeye özel dijital kafe menüsü",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${lora.variable} ${sourceSans.variable} ${plexMono.variable}`}
    >
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
