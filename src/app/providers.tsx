"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ReactNode } from "react";

import { ReCaptchaProvider } from "next-recaptcha-v3";

import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

const reCaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReCaptchaProvider reCaptchaKey={reCaptchaKey}>
        {children}
      </ReCaptchaProvider>
      <ToastContainer position="bottom-center" />
    </QueryClientProvider>
  );
}
