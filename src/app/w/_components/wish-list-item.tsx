"use client";

import { Recommendation } from "@/types/wishlist.type";

import Image from "next/image";

import { RatingStars, Card, Button, WishlistCardLink } from "@/components";

import { Check, Trash2 } from "lucide-react";

import { motion, useAnimate } from "framer-motion";

interface WishListItemProps {
  item: Recommendation;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}

export const WishListItem: React.FC<WishListItemProps> = ({
  item,
  onDelete,
  isDeleting = false,
}) => {
  const [scope] = useAnimate();

  return (
    <motion.div ref={scope} layout>
      <Card
        key={item.id}
        className="flex min-h-20 w-full flex-row items-center justify-between gap-3 rounded-md p-3"
      >
        <Image
          src={item.image}
          alt={item.title}
          width={64}
          height={64}
          className="h-16 w-1/5 flex-shrink-0 rounded object-cover"
        />
        <div className="flex w-6/10 items-center gap-3">
          <div className="flex min-w-0 flex-col justify-center gap-1">
            <WishlistCardLink title={item.title} link={item.link} />

            {typeof item.rating === "number" && item.rating > 0 && (
              <RatingStars rating={item.rating} />
            )}

            <span className="text-md font-bold select-none">
              €{item.price?.toFixed(2).replace(".00", "")}{" "}
              <span className="font-normal">
                &#40;
                <span>bol.com</span>
                &#41;
              </span>
            </span>

            <div>
              {item.bought_by === "-" && (
                <p className="text-sm text-green-600">Afgevinkt! 🎉</p>
              )}

                  {item.bought_by === "" && (
                    <p className="text-main-red text-sm">
                      Nog niet afgevinkt 👀
                    </p>
                  )}
            </div>
          </div>
        </div>

        <div className="flex w-1/5 justify-end">
          {item.bought_by !== "" ? (
            <div className="flex h-10 min-w-10 items-center justify-center rounded-full bg-emerald-500 text-white">
              <Check size={22} strokeWidth={2.5} />
            </div>
          ) : (
            <Button
              variant="ghost"
              className="flex h-10 w-10 items-center justify-center rounded-full border-[2px] border-red-500 p-0 text-red-500 transition-colors hover:bg-zinc-100 hover:text-red-500"
              onClick={() => onDelete(item.id)}
              aria-label="Delete"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="h-4 w-4 animate-spin text-red-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                </span>
              ) : (
                <Trash2 size={18} strokeWidth={2.5} />
              )}
            </Button>
          )}
        </div>
      </Card>
    </motion.div>
  );
};
