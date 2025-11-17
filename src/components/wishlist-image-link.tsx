"use client";

import React from "react";
import Image from "next/image";

import { useCreateAffiliateLink } from "@/hooks/api";

interface WishlistImageLinkProps {
  link: string;
  image: string;
  title: string;
  width: number;
  height: number;
  className?: string;
}

export const WishlistImageLink: React.FC<WishlistImageLinkProps> = ({
  link,
  image,
  title,
  width,
  height,
  className,
}) => {
  const { mutate: createAffiliateLinkMutation } = useCreateAffiliateLink();

  const handleClick = () => {
    createAffiliateLinkMutation({ link });
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
      <Image
        src={image}
        alt={title}
        width={width}
        height={height}
        style={{ width: "auto", height: "auto" }}
        className={className}
        onError={() => {
          console.error(`Failed to load image: ${image}`);
        }}
      />
    </div>
  );
};
