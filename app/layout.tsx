import { Providers } from "./providers";
import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from "next";

// These styles apply to every route in the application
import "./globals.css";

export const metadata: Metadata = {
  title: "Alex Mills — Graphic Designer",
  description:
    "Selected graphic design work by Alex Mills, including identity systems, art direction, and digital experiences.",
  openGraph: {
    title: "Alex Mills — Graphic Designer",
    description:
      "Graphic design, identity systems, and digital experiences by Alex Mills.",
    images: ["/alex-mills-logo.png"],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark h-full">
      <body className="h-full overflow-x-hidden">
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
