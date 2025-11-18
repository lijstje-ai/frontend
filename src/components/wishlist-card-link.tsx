"use client";

import React from "react";

import { useCreateAffiliateLink } from "@/hooks/api";

import { cn } from "@/lib/utils";

interface WishlistCardLinkProps {
  link: string;
  title: string;
  className?: string;
}

export const WishlistCardLink: React.FC<WishlistCardLinkProps> = ({
  link,
  title,
  className,
}) => {
  const { mutate: createAffiliateLinkMutation } = useCreateAffiliateLink();

  const openCreatedAffiliateLink = () => {
    createAffiliateLinkMutation({ link });
  };

  return (
    <div
      onClick={openCreatedAffiliateLink}
      className={cn(
        "line-clamp-2 cursor-pointer text-lg leading-tight font-semibold text-blue-900 hover:text-blue-800",
        className,
      )}
    >
      {title}
    </div>
  );
};
