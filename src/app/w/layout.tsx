import React from "react";

import { Footer } from "@/components";
import { WishlistHeader } from "@/app/w/_components";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto min-h-screen w-full flex flex-col justify-between bg-white sm:max-w-md">
      <WishlistHeader />
      {children}
      <Footer className="bg-gray-50" />
    </div>
  );
}
