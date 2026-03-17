"use client";

import { useEffect, useState } from "react";
import GlobalIdCardModal from "./GlobalIdCardModal";

export default function ModalController() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement;

      const button = target.closest("[data-id-card]") as HTMLElement | null;

      if (!button) return;

      const image = button.getAttribute("data-image");
      if (image) setImageUrl(image);
    }

    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <GlobalIdCardModal
      imageUrl={imageUrl}
      onClose={() => setImageUrl(null)}
    />
  );
}