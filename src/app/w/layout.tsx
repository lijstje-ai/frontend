import React from "react";

import { Footer } from "@/components";
import {
  AddToCartAnimationProvider,
  WishlistHeader,
} from "@/app/w/_components";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-screen w-full flex-col justify-between bg-white sm:max-w-md">
      <AddToCartAnimationProvider>
        <WishlistHeader />
        {children}
        <Footer className="bg-gray-50" />
      </AddToCartAnimationProvider>
    </div>
  );
}
