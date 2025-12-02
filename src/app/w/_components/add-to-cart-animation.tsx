"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";

import Image from "next/image";

import { AnimatePresence, motion } from "framer-motion";
import { GiftIcon } from "@/app/w/_components/gift-icon";

type AnimationItem = {
  id: string;
  top: number;
  left: number;
  deltaX: number;
  deltaY: number;
  width: number;
  height: number;
  borderRadius: string;
  image?: string;
  html?: string;
};

type AddToCartAnimationContextValue = {
  registerTarget: (node: HTMLElement | null) => void;
  triggerAnimation: (
    source: HTMLElement,
    image?: string,
  ) => Promise<void> | void;
  isBumping: boolean;
};

const AddToCartAnimationContext =
  createContext<AddToCartAnimationContextValue | null>(null);

export const useAddToCartAnimation = () =>
  useContext(AddToCartAnimationContext);

export const AddToCartAnimationProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const targetRef = useRef<HTMLElement | null>(null);
  const [items, setItems] = useState<AnimationItem[]>([]);
  const [isBumping, setIsBumping] = useState(false);
  const resolversRef = useRef<Map<string, () => void>>(new Map());

  const registerTarget = useCallback((node: HTMLElement | null) => {
    targetRef.current = node;
  }, []);

  const triggerAnimation = useCallback(
    (source: HTMLElement, image?: string) => {
      if (!source || !targetRef.current) return;

      const sourceRect = source.getBoundingClientRect();
      const targetRect = targetRef.current.getBoundingClientRect();
      const computed = getComputedStyle(source);
      const html = source.outerHTML;

      const startX = sourceRect.left + sourceRect.width / 2;
      const startY = sourceRect.top + sourceRect.height / 2;
      const targetX = targetRect.left + targetRect.width / 2;
      const targetY = targetRect.top + targetRect.height / 2;

      const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;

      setIsBumping(true);

      return new Promise<void>((resolve) => {
        resolversRef.current.set(id, resolve);

        setItems((prev) => [
          ...prev,
          {
            id,
            top: startY,
            left: startX,
            deltaX: targetX - startX,
            deltaY: targetY - startY,
            width: sourceRect.width,
            height: sourceRect.height,
            borderRadius: computed.borderRadius,
            image,
            html,
          },
        ]);
      });
    },
    [],
  );

  const handleAnimationComplete = useCallback((id: string) => {
    setItems((prev) => {
      const next = prev.filter((item) => item.id !== id);
      if (!next.length) setIsBumping(false);
      return next;
    });
    const resolver = resolversRef.current.get(id);
    if (resolver) {
      resolver();
      resolversRef.current.delete(id);
    }
  }, []);

  return (
    <AddToCartAnimationContext.Provider
      value={{ registerTarget, triggerAnimation, isBumping }}
    >
      {children}

      <AnimatePresence>
        {items.map((item) => (
          <motion.div
            key={item.id}
            className="pointer-events-none fixed z-[120] -translate-x-1/2 -translate-y-1/2 overflow-hidden"
            style={{
              top: item.top,
              left: item.left,
              width: item.width,
              height: item.height,
              borderRadius: item.borderRadius,
            }}
            initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
            animate={{
              x: item.deltaX,
              y: item.deltaY,
              scale: 0.2,
              opacity: [1, 0.95, 0],
            }}
            transition={{
              duration: 1.05,
              ease: [0.22, 1, 0.36, 1],
              opacity: { duration: 1.05, ease: "easeIn" },
            }}
            onAnimationComplete={() => handleAnimationComplete(item.id)}
          >
            {item.html ? (
              <div
                className="h-full w-full"
                dangerouslySetInnerHTML={{ __html: item.html }}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-white shadow-lg ring-1 ring-black/5">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt="Cadeau"
                    width={Math.max(40, Math.ceil(item.width))}
                    height={Math.max(40, Math.ceil(item.height))}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <GiftIcon size={20} className="text-main-red h-5 w-5" />
                )}
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </AddToCartAnimationContext.Provider>
  );
};
