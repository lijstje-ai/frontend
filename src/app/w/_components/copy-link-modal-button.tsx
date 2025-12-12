import React from "react";

import { CopyLinkModal } from "@/app/w/_components";
import { Wishlist } from "@/types";

interface CopyLinkModalButtonProps {
  wishlist: Wishlist;
  link: string;
}

export const CopyLinkModalButton: React.FC<CopyLinkModalButtonProps> = ({
  wishlist,
  link,
}) => {
  return (
    <div className="fixed left-0 z-50 h-[71px] w-full top-[calc(100dvh-71px)] border-t bg-gray-50 p-2.5">
      <div className="mx-auto max-w-[240px]">
        <CopyLinkModal
          wishlistName={wishlist.name}
          link={link}
          disabled={wishlist.wish_list.length === 0}
        />
      </div>
    </div>
  );
};
