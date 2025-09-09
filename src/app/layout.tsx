import React from "react";

import "@/app/globals.css";
import type { Metadata } from "next";
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
      <body
        className={cn(
          GeistSans.className,
          "bg-background text-foreground min-h-screen antialiased",
        )}
      >
        <div className="flex min-h-full flex-col bg-gray-50">
          <AppProviders>{children}</AppProviders>
        </div>
      </body>
    </html>
  );
}
