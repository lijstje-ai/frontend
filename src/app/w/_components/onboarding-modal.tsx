"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui";
import { Button } from "@/components/ui";
import { Plus } from "lucide-react";
import confetti from "canvas-confetti";

interface OnboardingModalProps {
  isOpen?: boolean;
  wishlistId?: string;
  onClose?: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen: initialIsOpen = true,
  wishlistId,
  onClose,
}) => {
  const [isOpen, setIsOpen] = useState(initialIsOpen);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storageKey = wishlistId
      ? `hasSeenEditPageOnboarding:${wishlistId}`
      : "hasSeenEditPageOnboarding";

    const hasSeenOnboarding = localStorage.getItem(storageKey);
    setIsOpen(!hasSeenOnboarding);
  }, [wishlistId]);

  const handleClose = () => {
    confetti({
      particleCount: 150,
      spread: 60,
    });

    setIsOpen(false);
    if (typeof window !== "undefined") {
      const storageKey = wishlistId
        ? `hasSeenEditPageOnboarding:${wishlistId}`
        : "hasSeenEditPageOnboarding";
      localStorage.setItem(storageKey, "true");
    }
    onClose?.();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="rounded-2xl" showCloseButton={false}>
        <DialogTitle className="sr-only">Aan de slag!</DialogTitle>

        <DialogHeader className="flex flex-col items-center gap-0 text-center">
          <div className="mb-6 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-main-red shadow-lg">
              <Plus className="size-10 text-white" strokeWidth={3} />
            </div>
          </div>
          <p className="text-center text-lg leading-relaxed text-gray-700">
            <b>Nu wordt het leuk!&nbsp;</b>🎉
            <br />
            <br />
            Gebruik de <span className="text-main-red">rode +iconen</span> om cadeaus toe te voegen aan je
            verlanglijstje. Deel het daarna met vrienden & familie. Klik op
            &apos;Start&apos; om te beginnen👇&nbsp;🎁
          </p>
        </DialogHeader>

        <Button onClick={handleClose} className="mt-4 w-full">
          Start
        </Button>
      </DialogContent>
    </Dialog>
  );
};
