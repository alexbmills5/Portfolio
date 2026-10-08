import { Providers } from "./providers";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";

// These styles apply to every route in the application
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://topaso.net"),
  title: "Alex Mills — Software Engineer",
  description:
    "Alex Mills is a software engineer in Palm Harbor, Florida, building full stack applications, REST APIs, and thoughtful user experiences with React and Node.js.",
  openGraph: {
    title: "Alex Mills — Software Engineer",
    description:
      "Full stack applications, connected systems, and software that matters. Explore Alex Mills' engineering experience and work.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alex Mills — Software Engineer",
    description: "Full stack applications. REST APIs. Thoughtful software.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
