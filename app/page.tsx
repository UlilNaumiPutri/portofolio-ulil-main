"use client";

import Image from "next/image";
import SpotlightImage from "./components/SpotlightImage";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";
import "./animations.css";

gsap.registerPlugin(ScrollTrigger);



export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);


  useGSAP(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) return;

    // --------------------------------------------------------
    // Hero Entrance Timeline
    // --------------------------------------------------------
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(badgeRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      delay: 0.3,
    })
      .from(
        headingRef.current,
        {
          opacity: 0,
          y: 30,
          duration: 0.7,
        },
        "-=0.3"
      )
      .from(
        descRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
        },
        "-=0.4"
      )
      .from(
        buttonsRef.current?.children ? Array.from(buttonsRef.current.children) : [],
        {
          opacity: 0,
          y: 16,
          scale: 0.95,
          stagger: 0.1,
          duration: 0.5,
        },
        "-=0.3"
      )
      .from(
        socialsRef.current?.children ? Array.from(socialsRef.current.children) : [],
        {
          opacity: 0,
          x: -12,
          stagger: 0.08,
          duration: 0.4,
        },
        "-=0.3"
      )
      .from(
        imageRef.current,
        {
          opacity: 0,
          scale: 0.94,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.8" // mulai bersamaan dengan desc
      )

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Hero Section */}
      <main className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-6xl mx-auto">

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left Side — Text Content */}
            <div className="space-y-8">

              {/* Heading */}
              <div ref={headingRef} className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                  Halo, aku
                  <span className="block" style={{ color: "#c05878" }}>
                    Putri
                  </span>
                  <TypeAnimation
                    sequence={[
                      "Project Management",
                      2000,
                      "Public Relations",
                      2000,
                      "Siswa SMK Telkom Malang",
                      2000,
                    ]}
                    wrapper="span"
                    cursor={true}
                    repeat={Infinity}
                    style={{ display: "inline-block", marginLeft: "1px", color: "#1a1a1a" }}
                    className="text-gray-800 text-2xl lg:text-4xl"
                  />
                </h1>
              </div>

              {/* Description */}
              <p
                ref={descRef}
                className="text-lg text-zinc-600 leading-relaxed max-w-xl"
              >
                Still learning, still growing, and slowly building the future i want.
              </p>

              {/* CTA Buttons */}
              <div ref={buttonsRef} className="flex flex-wrap gap-4">
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Link
                    href="/portofolio/produk"
                    className="group px-8 py-4 font-semibold rounded-full transition-all duration-300 flex items-center gap-2 text-white"
                    style={{
                      background: "linear-gradient(135deg, #c05878 0%, #7fb8e8 100%)",
                      boxShadow: "0 4px 20px rgba(192,88,120,0.3)",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLAnchorElement).style.background = "linear-gradient(135deg, #d4718f 0%, #90c5f0 100%)";
                      (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 6px 28px rgba(188,224,255,0.4)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLAnchorElement).style.background = "linear-gradient(135deg, #c05878 0%, #7fb8e8 100%)";
                      (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 20px rgba(192,88,120,0.3)";
                    }}
                  >
                    Lihat Portofolio
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.04, backgroundColor: "rgba(0,0,0,0.06)" }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Link
                    href="/about"
                    className="px-8 py-4 bg-black/5 backdrop-blur-sm text-gray-800 font-semibold rounded-full border border-black/15 hover:bg-black/10 transition-colors duration-300 block"
                  >
                    Tentang Saya
                  </Link>
                </motion.div>
              </div>

              {/* Social Links — Pill Badges */}
              <div ref={socialsRef} className="flex flex-wrap gap-3 pt-4">

                {/* LinkedIn */}
                <motion.a
                  href="https://www.linkedin.com/in/ulil-naumi-putri-5696a7418"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 backdrop-blur-sm border border-black/10 transition-colors duration-300"
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(188,224,255,0.7)";
                    (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(188,224,255,0.12)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "";
                    (e.currentTarget as HTMLElement).style.backgroundColor = "";
                  }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <svg className="w-4 h-4 text-zinc-500 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  <span className="text-sm font-medium text-zinc-600">LinkedIn</span>
                </motion.a>

                {/* Email */}
                <motion.a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=ulilnaumiputri.31@gmail.com "
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Kirim via Email"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 backdrop-blur-sm border border-black/10 transition-colors duration-300"
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(188,224,255,0.7)";
                    (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(188,224,255,0.12)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "";
                    (e.currentTarget as HTMLElement).style.backgroundColor = "";
                  }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <svg className="w-4 h-4 text-zinc-500 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4C2.897 4 2 4.897 2 6v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 5.921-8-5.921V6h16zM4 18V9.044l7.386 5.47a1 1 0 001.228 0L20 9.044V18H4z" />
                  </svg>
                  <span className="text-sm font-medium text-zinc-600">Email</span>
                </motion.a>

              </div>
            </div>

            {/* Right Side — Image */}
            {/* Right Side — Image */}
            <div ref={imageRef} className="relative lg:block">
              <div className="relative">

                {/* Decorative Blobs */}
                <div className="absolute -top-4 -left-4 w-72 h-72 rounded-full blur-3xl animate-blob" style={{ backgroundColor: "rgba(255,200,221,0.4)" }}></div>
                <div className="absolute -bottom-4 -right-4 w-72 h-72 rounded-full blur-3xl animate-blob-delayed" style={{ backgroundColor: "rgba(188,224,255,0.45)" }}></div>

                {/* Image Container */}
                <SpotlightImage className="relative z-10 w-full max-w-md mx-auto animate-float-slow">
                  {/* Foto Profil — clipping & shape dihandle oleh SVG blob di SpotlightImage */}
                  <div className="relative aspect-square">
                    <Image
                      src="/img/profile/ulil.jpeg"
                      alt="Foto Ulil — UI/UX Designer & Graphic Designer"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                </SpotlightImage>
              </div>
            </div>

          </div>

          <div className="mt-20" />

        </div>
      </main>
    </div>
  );
}