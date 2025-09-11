"use client";

import React, { useEffect } from "react";

import { Recommendation } from "@/types/wishlist.type";

import Image from "next/image";

import { RatingStars, Card, Button } from "@/components";

import { Check, Trash2 } from "lucide-react";

import { motion, usePresence, useAnimate } from "framer-motion";

interface WishListItemProps {
  item: Recommendation;
  onDelete: (id: string) => void;
}

export const WishListItem: React.FC<WishListItemProps> = ({
  item,
  onDelete,
}) => {
  const [isPresent, safeToRemove] = usePresence();
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (!isPresent) {
      const exitAnimation = async () => {
        await animate(
          "a",
          {
            color: item.bought_by !== "" ? "#6ee7b7" : "#fca5a5",
          },
          {
            ease: "easeIn",
            duration: 0.125,
          },
        );

        await animate(
          scope.current,
          { scale: 1.025 },
          { ease: "easeIn", duration: 0.125 },
        );

        await animate(
          scope.current,
          {
            opacity: 0,
            x: item.bought_by !== "" ? 24 : -24,
          },
          { delay: 0.75 },
        );

        safeToRemove();
      };

      exitAnimation();
    }
  }, [isPresent]);

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
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="line-clamp-2 block text-lg leading-tight font-semibold text-blue-900 hover:text-blue-800"
            >
              {item.title}
            </a>

            {typeof item.rating === "number" && item.rating > 0 && (
              <RatingStars rating={item.rating} />
            )}

            <span className="text-md font-bold select-none">
              €{item.price?.toFixed(2).replace(".00", "")}
            </span>

            <div>
              {item.bought_by === "-" && (
                <p className="text-sm text-green-600">Gemarkeerd als gekocht</p>
              )}

              {item.bought_by === "" && (
                <p className="text-main-red text-sm">
                  Nog niet gemarkeerd als gekocht
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="w-1/5 flex justify-end">
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
            >
              <Trash2 size={18} strokeWidth={2.5} />
            </Button>
          )}
        </div>
      </Card>
    </motion.div>
  );
};
