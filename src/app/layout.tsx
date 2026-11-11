import type { Metadata } from "next";
import "./globals.css";
import * as React from "react";
import { newsreader, plexMono, plexArabic } from "./fonts/manuscript";
import Providers from "./providers";
import { site } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} — ${site.role}`,
  description: site.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Dark-dominant by default; data-theme drives the palette.
    <html
      lang="en"
      data-theme="dark"
      className={`${newsreader.variable} ${plexMono.variable} ${plexArabic.variable}`}
    >
      <head>
        {/* Apply a stored theme before paint so the palette never flashes. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('theme');if(t){document.documentElement.setAttribute('data-theme',t)}}catch(e){}",
          }}
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
