"use client";

import { useRef, useCallback } from "react";

interface SpotlightImageProps {
  children: React.ReactNode;
  className?: string;
}

// ─── Blob paths ────────────────────────────────────────────────────────────────
// Kedua path bekerja dalam ruang 0–1 (objectBoundingBox) supaya otomatis
// responsif terhadap ukuran container tanpa perlu viewBox absolut.
//
// Blob A — bentuk default, asimetris lembut, lebih lebar kanan-atas
const BLOB_A =
  "M 0.50,0.05 " +
  "C 0.76,0.02 0.97,0.19 0.965,0.44 " +
  "C 0.96,0.69 0.82,0.91 0.57,0.965 " +
  "C 0.32,1.02 0.07,0.86 0.035,0.61 " +
  "C 0.00,0.36 0.14,0.08 0.50,0.05 Z";

// Blob B — sedikit lebih lebar di bawah-kiri, untuk keyframe morphing
const BLOB_B =
  "M 0.50,0.04 " +
  "C 0.73,0.00 0.98,0.22 0.96,0.47 " +
  "C 0.94,0.72 0.79,0.93 0.54,0.97 " +
  "C 0.29,1.01 0.04,0.83 0.04,0.58 " +
  "C 0.04,0.33 0.17,0.08 0.50,0.04 Z";

export default function SpotlightImage({ children, className }: SpotlightImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // ── Spotlight handlers — direct DOM mutation, no setState ──────────────────
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !glowRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    glowRef.current.style.setProperty("--x", `${x}%`);
    glowRef.current.style.setProperty("--y", `${y}%`);
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (!glowRef.current) return;
    glowRef.current.style.transition = "opacity 0.35s ease-in";
    glowRef.current.style.opacity = "1";
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!glowRef.current) return;
    glowRef.current.style.transition = "opacity 0.75s ease-out";
    glowRef.current.style.opacity = "0";
  }, []);

  return (
    <>
      {/*
        SVG defs — zero-size, hanya untuk mendefinisikan clipPath.
        Ditempatkan di luar container supaya tidak mengganggu layout.
        ID unik per-komponen tidak diperlukan karena komponen ini
        hanya dipakai sekali di hero section.
      */}
      <svg
        aria-hidden="true"
        width="0"
        height="0"
        style={{ position: "absolute", pointerEvents: "none" }}
      >
        <defs>
          {/* clipPathUnits="objectBoundingBox" → koordinat 0-1, otomatis responsif */}
          <clipPath id="blob-clip" clipPathUnits="objectBoundingBox">
            {/*
              path-nya dianimasikan lewat CSS @keyframes blobMorph
              yang didefinisikan di bawah (style tag).
              Kita gunakan animateMotion/SMIL bukan CSS karena
              `d` attribute di SVG lebih andal dianimasikan lewat SMIL
              di semua browser modern.
            */}
            <path id="blob-clip-path" d={BLOB_A}>
              <animate
                attributeName="d"
                dur="7s"
                repeatCount="indefinite"
                calcMode="spline"
                keyTimes="0; 0.5; 1"
                keySplines="0.45 0 0.55 1; 0.45 0 0.55 1"
                values={`${BLOB_A}; ${BLOB_B}; ${BLOB_A}`}
              />
            </path>
          </clipPath>
        </defs>
      </svg>

      {/* ── Main container ──────────────────────────────────────────────────── */}
      <div
        ref={containerRef}
        className={`relative ${className ?? ""}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          // Terapkan clip-path blob ke seluruh container (foto + glow sekaligus)
          clipPath: "url(#blob-clip)",
          // Sedikit padding virtual: blob path sudah mulai dari ~0.04 di atas,
          // jadi tidak perlu extra padding — photo tetap terisi penuh.
          WebkitClipPath: "url(#blob-clip)",
        }}
      >
        {/* Glow spotlight layer — mengikuti kursor, terbatas di dalam blob */}
        <div
          ref={glowRef}
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 20,
            pointerEvents: "none",
            opacity: 0,
            transition: "opacity 0.75s ease-out",
            // Radial gradient mengikuti --x/--y dari mousemove
            background: `radial-gradient(
              circle 180px at var(--x, 50%) var(--y, 50%),
              rgba(255, 200, 221, 0.55),
              rgba(188, 224, 255, 0.35) 45%,
              transparent 68%
            )`,
          }}
        />

        {/* Foto profil / children */}
        {children}
      </div>
    </>
  );
}
