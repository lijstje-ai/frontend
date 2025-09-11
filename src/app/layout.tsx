import React from "react";

import "@/app/globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";

import { cn } from "@/lib/utils";
import { AppProviders } from "./providers";

const GeistSans = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Slim verlanglijstje maken zonder account - Lijstje.ai",
  description:
    "Maak eenvoudig een online verlanglijstje met AI-cadeautips gebaseerd op leeftijd, geslacht, interesses en budget. Deel het gratis met familie en vrienden.",
  alternates: {
    canonical: "https://lijstje.ai/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id=GTM-5HP95SWT'+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5HP95SWT');
          `}
        </Script>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={cn(
          GeistSans.className,
          "bg-background text-foreground min-h-screen antialiased",
        )}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5HP95SWT"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <div className="flex min-h-full flex-col bg-gray-50">
          <AppProviders>{children}</AppProviders>
        </div>
      </body>
    </html>
  );
}
