"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { pageRoutes } from "@/config";

export const WishlistHeader = () => {
  const pathname = usePathname();
  const isPublicPage = pathname.split("/").length === 3;
  const isEditPage = pathname.includes("/edit");

  const handleScrollToWishlist = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
            className="flex items-center cursor-pointer text-gray-700 transition hover:text-primary"
          >
            Maak een lijstje!
          </Link>
        )}

        {isEditPage && (
          <button
            type="button"
            onClick={handleScrollToWishlist}
            className="md:hidden cursor-pointer text-gray-700 transition hover:text-primary"
          >
            Bewerk verlanglijstje
          </button>
        )}
      </div>
    </header>
  );
};
