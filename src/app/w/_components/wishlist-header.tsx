"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { pageRoutes } from "@/config";
import { Button } from "@/components";

export const WishlistHeader = () => {
  const pathname = usePathname();
  const isPublicPage = pathname.split("/").length === 3;
  const isEditPage = pathname.includes("/edit");

  const handleScrollToWishlist = () => {
    const element = document.querySelector("[data-wishlist-section]");
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="border-lightgray sticky top-0 z-50 w-full border-b bg-gray-50/70 backdrop-blur-sm sm:min-w-md">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {isPublicPage ? (
          <Link
            href={pageRoutes.index}
            target="_blank"
            className="flex items-center"
          >
            <span className="text-main-red cursor-pointer text-2xl font-bold">
              lijstje<span className="text-main-blue">.ai</span>
            </span>
          </Link>
        ) : (
          <div className="flex items-center">
            <span className="text-main-red text-2xl font-bold">
              lijstje<span className="text-main-blue">.ai</span>
            </span>
          </div>
        )}

        {isPublicPage && (
          <Link
            href={pageRoutes.index}
            target="_blank"
            className="flex items-center text-sm text-blue-500 hover:text-blue-600"
          >
            Maak een lijstje!
          </Link>
        )}

        {isEditPage && (
          <Button
            onClick={handleScrollToWishlist}
            className="md:hidden"
            variant="ghost"
          >
            Bewerk verlanglijstje
          </Button>
        )}
      </div>
    </header>
  );
};
