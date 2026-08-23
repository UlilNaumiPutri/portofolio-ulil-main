"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { OrganisasiItem } from "../../data/pengalaman";
import ImageWithFallback from "../../components/ImageWithFallback";
import "../../animations.css";

interface OrganisasiClientProps {
  items: OrganisasiItem[];
}

// ── Modal Detail ──────────────────────────────────────────────────────────────
function PengalamanModal({
  item,
  onClose,
}: {
  item: OrganisasiItem;
  onClose: () => void;
}) {
  // Tutup modal dengan Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    // Cegah scroll body saat modal terbuka
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        aria-label="Tutup modal"
        role="button"
        tabIndex={-1}
        style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)" }}
      >
        {/* Modal Card */}
        <motion.div
          key="modal"
          className="relative w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl"
          style={{ backgroundColor: "#fff" }}
          initial={{ opacity: 0, scale: 0.9, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 16 }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label={item.nama}
        >
          {/* ── Gambar Header ─────────────────────────────────────────────── */}
          <div className="relative aspect-[16/9] bg-gray-100 w-full">
            <ImageWithFallback
              src={item.image}
              alt={item.nama}
              fill
              unoptimized
              className="object-cover"
              fallbackClassName="absolute inset-0"
            />
            {/* Gradient overlay agar teks terbaca jika gambar gelap */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 55%)",
              }}
            />

            {/* Tombol Tutup */}
            <button
              onClick={onClose}
              aria-label="Tutup"
              className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center rounded-full transition-colors duration-200"
              style={{ backgroundColor: "rgba(255,255,255,0.85)", color: "#444" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  "rgba(255,255,255,1)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  "rgba(255,255,255,0.85)")
              }
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* ── Konten ────────────────────────────────────────────────────── */}
          <div className="p-6 space-y-4">
            {/* Badge periode */}
            {item.periode && (
              <span
                className="inline-block px-3 py-0.5 text-xs font-medium rounded-full"
                style={{
                  backgroundColor: "#fff0f5",
                  border: "1px solid rgba(255,200,221,0.7)",
                  color: "#c05878",
                }}
              >
                {item.periode}
              </span>
            )}

            {/* Nama kegiatan */}
            <h2 className="text-xl font-bold text-gray-900 leading-snug">
              {item.nama}
            </h2>

            {/* Role / jabatan — tampil hanya jika ada */}
            {item.role && (
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-0.5 rounded-full"
                  style={{ backgroundColor: "#BCE0FF" }}
                />
                <span className="text-sm font-medium" style={{ color: "#3a6a8f" }}>
                  {item.role}
                </span>
              </div>
            )}

            {/* Deskripsi lengkap */}
            <p className="text-zinc-600 text-sm leading-relaxed">{item.deskripsi}</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function OrganisasiClient({ items }: OrganisasiClientProps) {
  const [selected, setSelected] = useState<OrganisasiItem | null>(null);

  const openModal = useCallback((item: OrganisasiItem) => {
    setSelected(item);
  }, []);

  const closeModal = useCallback(() => {
    setSelected(null);
  }, []);

  return (
    <>
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-6">

          {/* ── Header Section ────────────────────────────────────────────── */}
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          >
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              <span style={{ color: "#c05878" }}>Pengalaman</span>
            </h1>
          </motion.div>

          {/* ── Grid / Empty State ────────────────────────────────────────── */}
          {items.length === 0 ? (
            <motion.div
              className="text-center py-24"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-12 h-12 text-zinc-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Belum ada kegiatan ditambahkan
              </h3>
              <p className="text-zinc-500">
                Kegiatan akan tampil di sini setelah ditambahkan.
              </p>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {items.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 24,
                    delay: i * 0.06,
                  }}
                >
                  {/* ── Card — klik = buka modal ────────────────────────── */}
                  <motion.button
                    type="button"
                    onClick={() => openModal(item)}
                    aria-label={`Lihat detail: ${item.nama}`}
                    className="group relative w-full overflow-hidden rounded-2xl bg-black/5 backdrop-blur-sm border border-black/10 hover:border-black/20 transition-colors duration-300 flex flex-col text-left cursor-pointer"
                    whileHover={{
                      y: -8,
                      scale: 1.01,
                      boxShadow: "0 20px 40px rgba(255,200,221,0.2)",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {/* Gambar */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-2xl bg-gray-100">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.nama}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        fallbackClassName="absolute inset-0 rounded-t-2xl"
                      />

                      {/* Hover overlay + "Lihat Detail" hint */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none">
                        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 text-white">
                          <span className="text-sm font-medium">Lihat Detail</span>
                          <svg
                            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Card Info */}
                    <div className="p-5 flex-1 flex flex-col gap-3">
                      {/* Periode badge */}
                      {item.periode && (
                        <span
                          className="inline-block self-start px-3 py-0.5 text-xs font-medium rounded-full"
                          style={{
                            backgroundColor: "#fff0f5",
                            border: "1px solid rgba(255,200,221,0.7)",
                            color: "#c05878",
                          }}
                        >
                          {item.periode}
                        </span>
                      )}

                      {/* Nama */}
                      <h3 className="text-base font-bold text-gray-900 line-clamp-2 text-left transition-colors duration-200 group-hover:text-[#c05878]">
                        {item.nama}
                      </h3>

                      {/* Deskripsi — dipotong 2 baris di card, full di modal */}
                      <p className="text-zinc-500 text-sm leading-relaxed line-clamp-2 flex-1">
                        {item.deskripsi}
                      </p>

                      {/* "Lihat selengkapnya" cue */}
                      <span
                        className="inline-flex items-center gap-1 text-xs font-medium mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        style={{ color: "#c05878" }}
                      >
                        Lihat selengkapnya
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2.5}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </span>
                    </div>
                  </motion.button>
                </motion.div>
              ))}
            </div>
          )}

        </div>
      </div>

      {/* ── Modal — dirender di luar flow normal ──────────────────────────── */}
      {selected && <PengalamanModal item={selected} onClose={closeModal} />}
    </>
  );
}
