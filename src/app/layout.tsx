import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/navigation";

export const metadata: Metadata = {
  title: "kuroki-chan",
  description: "Browsing cambodian basket-weaving forums since 2002!",
  metadataBase: new URL("https://kurokichan.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="h-screen bg-background text-foreground font-sans antialiased">
        <Navigation />
        <main>{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
