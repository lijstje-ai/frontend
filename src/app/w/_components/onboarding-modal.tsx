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

interface OnboardingModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen: initialIsOpen = true,
  onClose,
}) => {
  const [isOpen, setIsOpen] = useState(initialIsOpen);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasSeenOnboarding = localStorage.getItem("hasSeenEditPageOnboarding");
      if (hasSeenOnboarding) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("hasSeenEditPageOnboarding", "true");
    }
    onClose?.();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className="rounded-2xl"
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">
            Aan de slag!
        </DialogTitle>

        <DialogHeader className="flex flex-col items-center gap-0 text-center">
          <div className="mb-6 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#EF4444] shadow-lg">
              <Plus className="size-10 text-white" strokeWidth={3} />
            </div>
          </div>
          <p className="text-lg leading-relaxed text-gray-700 text-center">
            <b>Nu wordt het leuk!&nbsp;</b>🎉
            <br />
            <br />
            Gebruik de rode +iconen om cadeaus toe te voegen aan je lijstje.
            Deel het daarna met vrienden & familie. Klik op &apos;Start&apos; om te
            beginnen👇&nbsp;🎁
          </p>
        </DialogHeader>

        <Button
          onClick={handleClose}
          className="mt-4 w-full"
        >
          Start
        </Button>
      </DialogContent>
    </Dialog>
  );
};
