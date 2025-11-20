import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "High Elo LLMs",
  description: "Chat with the best LLMs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={dmSans.className}>
      <body className={`antialiased`}>
        <div className="root">
          <Providers>
            {children}
          </Providers></div>
      </body>
    </html>
  );
}
