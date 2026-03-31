"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";

export function useQueryParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const sp = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === null) sp.delete(key);
        else sp.set(key, value);
      });

      startTransition(() => {
        const queryString = sp.toString();
        router.replace(
          queryString ? `${pathname}?${queryString}` : pathname
        );
      });
    },
    [searchParams, pathname, router]
  );

  return {
    searchParams,
    updateParams,
    isPending,
  };
}