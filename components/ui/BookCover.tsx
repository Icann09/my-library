"use client"

import { cn } from "@/lib/utils";
import BookCoverSvg from "./BookCoverSvg";
import { IKImage } from "imagekitio-next";
import config from "@/lib/config";

type BookCoverVariant = "extraSmall" | "small" | "medium" | "regular" | "wide";

const variantStyles: Record<BookCoverVariant, string> = {
  extraSmall: "book-cover_extra_small",
  small: "book-cover_small",
  medium: "book-cover_extra_medium",
  regular: "book-cover_regular",
  wide: "book-cover_wide",
}

interface Props {
  className?: string;
  variant?: BookCoverVariant;
  coverColor: string;
  coverImage: string;
}

export default function BookCover({ className, variant = "regular", coverColor = "#012B48", coverImage}: Props) {
  return (
    <div className={cn("relative transition-all duration-300", variantStyles[variant], className)}>
      <BookCoverSvg coverColor={coverColor}/>
      <div className="absolute z-10" style={{ left: "12%", width: "87.5%", height: "88%"}} >
      <IKImage
        path={coverImage}
        urlEndpoint={config.env.imageKit.urlEndpoint}
        alt="Book cover"
        fill
        className="rounded-sm object-fill"
        loading="lazy"
        lqip={{ active: true }}
        onError={() => {
          console.error('Failed to load image');
          // Optionally, you could set a default image here
        }}
      />
      </div>
    </div>
  )
}