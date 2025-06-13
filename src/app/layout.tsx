import "@/app/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
const GeistSans = Inter({ subsets: ["latin"] });
import { cn } from "@/lib/utils";
import { AppProviders } from "./providers";

export const metadata: Metadata = {
  title: {
    default: "Wishlist App",
    template: "%s | Wishlist",
  },
  description: "Create, share and reserve gifts with AI assistance.",
  keywords: ["wishlist", "gift list", "AI", "kids", "birthday", "sharing"],
  authors: [{ name: "Your Name or Team", url: "https://yourdomain.com" }],
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={cn(
          GeistSans.className,
          "min-h-screen bg-background text-foreground antialiased"
        )}
      >
        <div className="max-w-[480px] mx-auto px-4 py-6 flex flex-col gap-6">
          <AppProviders>{children}</AppProviders>
        </div>
      </body>
    </html>
  );
}
