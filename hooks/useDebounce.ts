"use client";

import { useEffect } from "react";

export function useDebounce(
  value: string,
  delay: number,
  enabled: boolean,
  callback: (val: string) => void
) {
  useEffect(() => {
    if (!enabled) return;

    const id = setTimeout(() => {
      callback(value);
    }, delay);

    return () => clearTimeout(id);
  }, [value, delay, enabled, callback]);
}