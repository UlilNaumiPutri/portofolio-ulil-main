"use client";

import Link from "next/link";
import ImageWithFallback from "../../components/ImageWithFallback";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "motion/react";
import { PortofolioItem } from "../../data/portofolio";
import "../../animations.css";

gsap.registerPlugin(ScrollTrigger);

interface PortfolioClientProps {
  projects: PortofolioItem[];
}

export default function PortfolioClient({ projects }: PortfolioClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // GSAP: header entrance + card stagger
  useGSAP(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    // --- Header entrance ---
    const headerEls = headerRef.current?.children;
    if (headerEls) {
      gsap.from(Array.from(headerEls), {
        opacity: 0,
        y: 30,
        stagger: 0.12,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.2,
      });
    }

    // NOTE: Card entrance ditangani oleh Motion whileInView (lihat JSX di bawah)
    // GSAP ScrollTrigger tidak dipakai untuk cards agar tidak konflik dengan Motion
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen py-20">
      <div className="container mx-auto px-6">

        {/* Header Section */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16">

          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            <span style={{ color: "#c05878" }}>
              Daftar Project
            </span>
          </h1>
        </div>


        {/* Portfolio Grid */}
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <AnimatePresence mode="popLayout">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                layout
                className="portfolio-card"
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92, y: -10 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
              >
                <motion.div
                  className="group relative overflow-hidden rounded-2xl bg-black/5 backdrop-blur-sm border border-black/10 hover:border-black/20 transition-colors duration-300 flex flex-col"
                  style={{ "--hover-shadow": "0 20px 40px rgba(255,200,221,0.2)" } as React.CSSProperties}
                  whileHover={{ y: -8, scale: 1.01, boxShadow: "0 20px 40px rgba(255,200,221,0.2)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* Clickable upper area: Image + Content */}
                  <Link href={`/portofolio/produk/${project.id}`} className="block flex-1">

                    {/* Image Container */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                      <ImageWithFallback
                        src={project.image}
                        alt={project.name}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        fallbackClassName="absolute inset-0"
                      />

                      {/* Overlay on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex items-center gap-2 text-white">
                            <span className="text-sm font-medium">Lihat Project</span>
                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 pb-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 transition-colors" style={{ "--hover-color": "#c05878" } as React.CSSProperties}
                        onMouseEnter={e => (e.currentTarget.style.color = "#c05878")}
                        onMouseLeave={e => (e.currentTarget.style.color = "")}>
                        {project.name}
                      </h3>
                      <p className="text-zinc-500 text-sm line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                  </Link>

                  {/* Action Buttons */}
                  <div className="px-6 pb-6 pt-2 flex flex-wrap gap-2">
                    {/* Tombol: Lihat Project (primary – filled red) */}
                    <Link
                      href={`/portofolio/produk/${project.id}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                      style={{ backgroundColor: "#FFC8DD", color: "#7a2a42", boxShadow: "0 2px 8px rgba(255,200,221,0.3)" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#ffd6e7"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 16px rgba(255,200,221,0.45)"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#FFC8DD"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 2px 8px rgba(255,200,221,0.3)"; }}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Lihat Project
                    </Link>

                    {/* Tombol: Lihat Repo (secondary – outline, hanya tampil jika repoUrl terisi) */}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border border-[#BCE0FF] transition-all duration-200"
                        style={{ backgroundColor: "rgba(188,224,255,0.25)", color: "#3a6a8f" }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "rgba(188,224,255,0.5)";
                          (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 14px rgba(188,224,255,0.4)";
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "rgba(188,224,255,0.25)";
                          (e.currentTarget as HTMLAnchorElement).style.boxShadow = "";
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {/* Figma icon */}
                        <svg className="w-3.5 h-3.5" viewBox="0 0 38 57" fill="currentColor">
                          <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z"/>
                          <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 0 1-19 0z"/>
                          <path d="M19 0v19h9.5a9.5 9.5 0 0 0 0-19H19z"/>
                          <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z"/>
                          <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z"/>
                        </svg>
                        Lihat Design
                      </a>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>



        {/* CTA Section */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >

        </motion.div>

      </div>
    </div>
  );
}
