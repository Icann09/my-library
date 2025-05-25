"use client";

import { IKImage, ImageKitProvider, IKUpload, IKVideo } from "imagekitio-next";
import config from "@/lib/config";
import { useRef, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { cn } from "@/lib/utils";


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
    const response = await fetch(`${apiEndpoint}/api/auth/imagekit`);
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

interface Props {
  onFileChange: (filePath: string) => void;
  type: "image" | "video";
  accept: string;
  placeholder: string;
  folder: string;
  variant: "dark" | "light";
  value?: string;
}

export default function FileUpload({ onFileChange, type, accept, placeholder, folder, variant, value }: Props) {
  const ikUploadRef = useRef<IKUpload | null>(null);
  const [file, setFile] = useState<{ filePath: string | null }>({filePath: value ?? null,});
  const [progress, setProgress] = useState(0);
  const styles = {
    button: variant === "dark" ? "bg-dark-300" : "bg-white border-gray-100 border",
    placeholder: variant === "dark" ? "text-light-100" : "text-slate-500",
    text: variant === "dark" ? "text-light-100" : "text-slate-500",
  }

  const onError = (error: any) => {
    console.error("Upload error:", error);
    toast.error(`${type} upload failed.`);
  };

  const onSuccess = (res: any) => {
    if (res?.filePath) {
      setFile(res);
      onFileChange(res.filePath);
      toast.success(`${type} uploaded successfully.`);
    } else {
      toast.error("Upload failed: Missing file path.");
    }
  };

  const onValidate = (file: File) => {
    if (type === "image") {
      if (file.size > 20 * 1024 * 1024) {
        toast.error("Please upload a file that is less than 20 MB in size");
        return false;
      }
      return true
    } else if (type === "video") {
      if (file.size > 50 * 1024 * 1024) {
        toast.error("Please upload a file that is less than 50 MB in size");
        return false;
      }
      return true;
    } return true;
  };  

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        useUniqueFileName={true}
        validateFile={onValidate}
        onUploadStart={() => setProgress(0)}
        onUploadProgress={({ loaded, total }) => {
          const percent = Math.round((loaded / total) * 100);

          setProgress(percent);
        }}
        folder={folder}
        accept={accept}
        className="hidden"
      />

      <button
        className={cn("upload-btn bg-dark-300", styles.button)}
        onClick={(e) => {
          e.preventDefault();

          if (ikUploadRef.current) {
            // @ts-ignore
            ikUploadRef.current?.click();
          }
        }}
      >
        <Image
          src="/icons/upload.svg"
          alt="upload-icon"
          width={20}
          height={20}
          className="object-contain"
        />

        <p className={cn("text-base", styles.placeholder)}>{placeholder}</p>

        {file && (
          <p className={cn("upload-filename", styles.text)}>{file.filePath}</p>
        )}
      </button>

      {progress > 0 && progress !== 100 && (
        <div className="w-full rounded-full bg-green-200">
          <div className="progress" style={{ width: `${progress}%` }}>
            {progress}%
          </div>
        </div>
      )}

      {file?.filePath &&
        (type === "image" ? (
          <IKImage
            alt={file.filePath}
            path={file.filePath}
            width={500}
            height={300}
          />
        ) : type === "video" ? (
          <IKVideo
            path={file.filePath}
            controls={true}
            className="h-96 w-full rounded-xl"
          />
        ) : null)}
    </ImageKitProvider>
  );
}
