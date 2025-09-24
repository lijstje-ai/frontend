"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export const useCleanShareUrl = () => {
  const pathname = usePathname();
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    const origin = window.location.origin;
    const cleanPath = pathname.endsWith("/edit")
      ? pathname.replace(/\/edit$/, "")
      : pathname;
    setShareUrl(`${origin}${cleanPath}`);
  }, [pathname]);

  return shareUrl;
};
