"use client";

import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button, Input } from "@/components";

import {
  WhatsappShareButton,
  TelegramShareButton,
  WhatsappIcon,
  TelegramIcon,
} from "react-share";

interface CopyLinkModalProps {
  wishlistName: string;
  link: string;
  disabled?: boolean;
}

export const CopyLinkModal: React.FC<CopyLinkModalProps> = ({
  wishlistName,
  link,
  disabled = false,
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    setIsCopied(true);
  };

  return (
    <Dialog>
      {disabled ? (
        <Button
          id="btn-deel-verlanglijstje"
          className="mt-4 w-full"
          variant="secondary"
          disabled
        >
          Deel verlanglijstje
        </Button>
      ) : (
        <DialogTrigger asChild>
          <Button id="btn-deel-verlanglijstje" className="mt-4 w-full">
            Deel verlanglijstje
          </Button>
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deel je verlanglijstje</DialogTitle>
        </DialogHeader>
        <div className="flex flex-row items-center gap-4 pt-4">
          <WhatsappShareButton url={link}>
            <WhatsappIcon round size={48} />
          </WhatsappShareButton>
          <TelegramShareButton url={link}>
            <TelegramIcon round size={48} />
          </TelegramShareButton>
          <a
            href={`mailto:?subject=${encodeURIComponent(wishlistName)}&body=${encodeURIComponent(link)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="24" cy="24" r="24" fill="#ececec" />
              <path
                d="M12 18v12a2 2 0 002 2h20a2 2 0 002-2V18a2 2 0 00-2-2H14a2 2 0 00-2 2zm2 0l10 7 10-7"
                stroke="#222"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <Input value={link} readOnly className="flex-1" />
          <Button type="button" onClick={handleCopy}>
            {isCopied ? "Gekopieerd!" : "Kopieer link"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
