"use client";

import React from "react";

import { useCreateAffiliateLink } from "@/hooks/api";

interface WishlistCardLinkProps {
  link: string;
  title: string;
}

export const WishlistCardLink: React.FC<WishlistCardLinkProps> = ({
  link,
  title,
}) => {
  const { mutate: createAffiliateLinkMutation, isPending: isCreatePending } =
    useCreateAffiliateLink();

  const openCreatedAffiliateLink = () => {
    createAffiliateLinkMutation({ link });
  };

  return (
    <div
      onClick={openCreatedAffiliateLink}
      className="line-clamp-2 cursor-pointer text-lg leading-tight font-semibold text-blue-900 hover:text-blue-800"
    >
      {isCreatePending ? (
        <span className="text-gray-800">Laden...</span>
      ) : (
        title
      )}
    </div>
  );
};
