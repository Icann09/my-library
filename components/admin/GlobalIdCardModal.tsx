"use client";

import { IKImage } from "imagekitio-next";
import config from "@/lib/config";

type Props = {
  imageUrl: string | null;
  onClose: () => void;
};

export default function GlobalIdCardModal({ imageUrl, onClose }: Props) {
  if (!imageUrl) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-4 rounded-lg shadow-lg relative max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-lg"
        >
          ✕
        </button>

        <div className="mt-8">
          <IKImage
            path={imageUrl}
            urlEndpoint={config.env.imageKit.urlEndpoint}
            alt="User ID Card"
            width={500}
            height={500}
            loading="lazy"
            className="w-full h-auto rounded object-contain"
            lqip={{ active: true }}
          />
        </div>
      </div>
    </div>
  );
}