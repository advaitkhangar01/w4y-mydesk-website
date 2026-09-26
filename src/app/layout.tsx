import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { APP_CONFIG } from "@/lib/config";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${APP_CONFIG.brand.name} ${APP_CONFIG.brand.product} — ${APP_CONFIG.brand.tagline}`,
  description: `${APP_CONFIG.brand.proposition} ₹5,000 one-time purchase. No subscription.`,
  metadataBase: new URL(APP_CONFIG.brand.url),
  openGraph: {
    title: `${APP_CONFIG.brand.name} ${APP_CONFIG.brand.product} — ${APP_CONFIG.brand.tagline}`,
    description: APP_CONFIG.brand.proposition,
    url: APP_CONFIG.brand.url,
    siteName: `${APP_CONFIG.brand.name} ${APP_CONFIG.brand.product}`,
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-white text-w4y-dark dark:bg-w4y-dark-bg dark:text-w4y-dark-text antialiased selection:bg-w4y-pastel-blue selection:text-w4y-blue">
        {children}
      </body>
    </html>
  );
}
