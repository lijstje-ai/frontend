"use client";
import { useState, useEffect } from "react";

export const useCountdown = (isActive: boolean, startCount: number = 10) => {
  const [countdown, setCountdown] = useState<number | null>(null);

  const startCountdown = () => {
    setCountdown(startCount * 10);
  };

  const displayCountdown =
    countdown === null
      ? null
      : countdown <= 0
        ? "👀"
        : (countdown / 10).toFixed(1);

  useEffect(() => {
    if (countdown === null || countdown <= 0) return;

    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 100);

    return () => clearTimeout(timer);
  }, [countdown]);

  useEffect(() => {
    if (!isActive && countdown !== null) {
      setCountdown(null);
    }
  }, [isActive, countdown]);

  return {
    countdown: displayCountdown,
    startCountdown,
    setCountdown,
  };
};
