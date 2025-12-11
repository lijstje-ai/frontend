"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useMemo } from "react";

import { motion } from "framer-motion";

import { pageRoutes } from "@/config";
import { useAddToCartAnimation } from "@/app/w/_components/add-to-cart-animation";
import { GiftIcon } from "@/app/w/_components/gift-icon";
import { useWishlistQuery } from "@/hooks/api";

export const WishlistHeader = () => {
  const pathname = usePathname();
  const params = useParams();
  const addToCartAnimation = useAddToCartAnimation();

  const { isPublicPage, isEditPage } = useMemo(() => {
    return {
      isPublicPage: pathname.split("/").length === 3,
      isEditPage: pathname.includes("/edit"),
    };
  }, [pathname]);

  const wishlistId =
    isEditPage && typeof params?.id === "string" ? params.id : "";
  const { data: wishlistData } = useWishlistQuery(wishlistId);
  const wishlistCount = wishlistData?.wishlist?.wish_list?.length ?? 0;

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
              feest<span className="text-main-blue">.ai</span>
            </span>
          </Link>
        ) : (
          <div className="flex items-center">
            <span className="text-main-red text-2xl font-bold">
              feest<span className="text-main-blue">.ai</span>
            </span>
          </div>
        )}

        {isPublicPage && (
          <Link
            href={pageRoutes.index}
            target="_blank"
            className="flex items-center text-blue-900 transition hover:text-blue-800"
          >
            Maak een verlanglijstje!
          </Link>
        )}

        {isEditPage && (
          <div className="flex items-center gap-2">
            <motion.button
              type="button"
              aria-label="Scroll to boven"
              ref={(node) => addToCartAnimation?.registerTarget(node)}
              onClick={handleScrollToWishlist}
              animate={{ scale: addToCartAnimation?.isBumping ? 1.05 : 1 }}
              transition={{ type: "spring", stiffness: 280, damping: 16 }}
              className="relative flex h-8 w-12 items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              <GiftIcon
                size={42}
                className="pointer-events-none absolute inset-0 m-auto h-10 w-10.5 text-black"
              />

              <motion.span
                key={wishlistCount}
                initial={{ scale: 0.95 }}
                animate={{ scale: [0.95, 1.15, 1] }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="bg-main-red absolute -top-1.5 -right-0.5 flex min-h-[18px] min-w-4.5 items-center justify-center rounded-full px-1.5 text-[12px] leading-none font-semibold text-white"
              >
                {wishlistCount}
              </motion.span>
            </motion.button>
          </div>
        )}
      </div>
    </header>
  );
};
