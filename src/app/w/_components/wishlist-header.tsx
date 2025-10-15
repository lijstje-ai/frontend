"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { pageRoutes } from "@/config";

export const WishlistHeader = () => {
  const pathname = usePathname();
  const isPublicPage = pathname.split("/").length === 3;

  return (
    <header className="border-lightgray sticky top-0 z-50 w-full border-b bg-gray-50/70 backdrop-blur-sm sm:min-w-md">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link
          href={pageRoutes.index}
          target="_blank"
          className="flex items-center"
        >
          <span className="text-main-red cursor-pointer text-2xl font-bold">
            lijstje<span className="text-main-blue">.ai</span>
          </span>
        </Link>

        {isPublicPage && (
          <Link
            href={pageRoutes.index}
            target="_blank"
            className="flex items-center"
          >
            Maak een lijstje!
          </Link>
        )}
      </div>
    </header>
  );
};
