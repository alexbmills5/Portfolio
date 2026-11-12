import { Providers } from "./providers";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { IBM_Plex_Mono, Source_Sans_3 } from "next/font/google";

// These styles apply to every route in the application
import "./globals.css";

const sans = Source_Sans_3({ subsets: ["latin"], variable: "--font-sans" });
const mono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://topaso.net"),
  title: "Alex Mills — Software Engineer",
  description:
    "Alex Mills is a software engineer in Palm Harbor, Florida, building full stack applications, REST APIs, and thoughtful user experiences with React and Node.js.",
  openGraph: {
    title: "Alex Mills — Software Engineer",
    description:
      "Explore Alex Mills’ work in full stack engineering, APIs, and immersive software.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alex Mills — Software Engineer",
    description: "Full stack applications, REST APIs, and immersive software.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${sans.variable} ${mono.variable}`}>
      <body>
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
