"use client";

import { IKImage, ImageKitProvider, IKUpload } from "imagekitio-next";
import config from "@/lib/config";
import { useRef, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";

const {
  env: {
    imageKit: { publicKey, urlEndpoint },
    apiEndpoint,
  },
} = config;

const authenticator = async () => {
  try {
    if (!apiEndpoint) {
      throw new Error("API endpoint is not defined.");
    }
    const response = await fetch(`${apiEndpoint}/auth/imagekit`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Request failed with status ${response.status}: ${errorText}`);
    }
    return await response.json();
  } catch (error: any) {
    console.error("ImageKit authentication error:", error);
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

export default function ImageUpload({ onFileChange }: { onFileChange: (fieldPath: string) => void }) {
  const ikUploadRef = useRef<IKUpload | null>(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);

  const onError = (error: any) => {
    console.error("Upload error:", error);
    toast.error("Image upload failed.");
  };

  const onSuccess = (res: any) => {
    if (res?.filePath) {
      setFile(res);
      onFileChange(res.filePath);
      toast.success("Image uploaded successfully.");
    } else {
      toast.error("Upload failed: Missing file path.");
    }
  };

  return (
    <ImageKitProvider publicKey={publicKey} urlEndpoint={urlEndpoint} authenticator={authenticator}>
      <IKUpload ref={ikUploadRef} onError={onError} onSuccess={onSuccess} fileName="test-upload.png" />

      <button
        className="upload-btn"
        onClick={(e) => {
          e.preventDefault();
          ikUploadRef.current?.click();
        }}
      >
        <Image src="/icons/upload.svg" alt="upload-icon" width={20} height={20} className="object-contain" />
        <p className="text-base text-light-100">Upload a File</p>
        {file && <p className="upload-filename">{file.filePath}</p>}
      </button>

      {file && <IKImage alt={file.filePath} path={file.filePath} width={500} height={500} />}
    </ImageKitProvider>
  );
}
