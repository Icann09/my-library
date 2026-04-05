"use client";

import { useState, memo } from "react";
import { ExternalLink } from "lucide-react";
import { IKImage } from "imagekitio-next";
import config from "@/lib/config";

type ViewIdCardButtonProps = {
  imageUrl: string;
};

function ViewIdCardButton({ imageUrl }: ViewIdCardButtonProps) {
  const [showModal, setShowModal] = useState(false);

  function openModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  return (
    <>
      <button
        onClick={openModal}
        className="text-blue-600 hover:underline flex items-center gap-1 min-w-[100px] mx-auto"
      >
        View ID Card <ExternalLink size={14} />
      </button>

      {showModal && (
        <Modal imageUrl={imageUrl} onClose={closeModal} />
      )}
    </>
  );
}

export default memo(ViewIdCardButton);

type ModalProps = {
  imageUrl: string;
  onClose: () => void;
};

function Modal({ imageUrl, onClose }: ModalProps) {
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
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-lg"
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