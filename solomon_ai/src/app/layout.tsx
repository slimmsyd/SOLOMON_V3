import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionWrapper from "./ProvidersWrapper";
import { ConversationProvider } from "./hooks/ConversationContext";
 import { GoogleTagManager } from '@next/third-parties/google'
const inter = Inter({ subsets: ["latin"] });

import icon from '../../public/favicon.ico'

export const metadata: Metadata = {
  title: "Solomon AI | Leading Metaphysical Co-Pilot",
  description: "Truth is Truth no matter where you go.",
  icons: {
    icon: "../../public/favicon.png",
    apple: "../../public/favicon.png",
  }

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId="G-NQ5849R4JY" />
      <SessionWrapper>
        <ConversationProvider>
          <body className={inter.className}>{children}</body>
        </ConversationProvider>
      </SessionWrapper>
    </html>
  );
}
