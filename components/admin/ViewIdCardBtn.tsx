"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { IKImage } from "imagekitio-next";
import config from "@/lib/config";

type ViewIdCardButtonProps = {
  imageUrl: string;
};

export default function ViewIdCardButton({ imageUrl }: ViewIdCardButtonProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="text-blue-600 hover:underline flex items-center gap-1"
      >
        View ID Card <ExternalLink size={14} />
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg relative max-w-md w-full">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black text-lg"
            >
              ✕
            </button>
            <div className="mt-8" >
              <IKImage
                path={imageUrl}
                urlEndpoint={config.env.imageKit.urlEndpoint}
                alt="Book cover"
                className="w-full h-auto rounded object-contain"
                width={500}
                height={500}
                loading="lazy"
                lqip={{ active: true }}
                onError={() => {
                  console.error('Failed to load image');
                  // Optionally, you could set a default image here
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
