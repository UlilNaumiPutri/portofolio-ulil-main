"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

interface ImageWithFallbackProps extends Omit<ImageProps, "src"> {
  src?: string | null;
  fallbackClassName?: string;
}

/**
 * Komponen gambar dengan fallback otomatis.
 * - Jika `src` kosong / null / undefined → langsung tampilkan placeholder
 * - Jika gambar gagal dimuat (onError) → tampilkan placeholder
 * Placeholder mengikuti className parent sehingga border-radius, sizing, dll tetap konsisten.
 */
export default function ImageWithFallback({
  src,
  alt,
  fallbackClassName,
  className,
  ...rest
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);

  const showFallback = !src || hasError;

  if (showFallback) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-2 bg-gray-100 ${fallbackClassName ?? ""}`}
        aria-label={alt}
        role="img"
      >
        {/* Ikon gambar sederhana */}
        <svg
          className="w-8 h-8 text-gray-400 shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span className="text-xs text-gray-400 font-medium text-center px-2 leading-tight">
          Gambar sedang dicari
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
      {...rest}
    />
  );
}
