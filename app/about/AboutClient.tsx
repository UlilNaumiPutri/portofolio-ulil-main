"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "motion/react";
import "../animations.css";

gsap.registerPlugin(ScrollTrigger);

// ── Data Placeholders ─────────────────────────────────────────────────────────
const heroData = {
  name: "Ulil Naumi Putri", 
  title: "Project Management", 
  bio: "Siap bekerjasama dan bertanggung jawab dalam sebuah tim",
};

// TODO: tulis bio lengkap sebagai string paragraf-paragraf
const fullBio: string[] = [
  // TODO: isi paragraf pertama bio lengkap
  "Halo, saya Ulil Naumi Putri, siswi SMK Telkom Malang jurusan Rekayasa Perangkat Lunak dengan fokus UI/UX Designer. Selama belajar di bidang tersebut, saya juga menemukan bahwa saya lebih tertarik dengan Event & Project Management. Saya suka terlibat dalam proses sebuah kegiatan, mulai dari menyiapkan konsep, mengatur kebutuhan, membagi tugas, berkoordinasi dengan tim, sampai memastikan acara berjalan dengan lancar.",
    
  "Saya sudah beberapa kali terlibat dalam kegiatan sebagai ketua, koordinator divisi humas, maupun anggota kepanitiaan. Dari pengalaman tersebut, saya banyak belajar tentang kerja sama tim, komunikasi dengan berbagai pihak, publikasi, sponsorship, dan bagaimana menghadapi berbagai kebutuhan yang muncul selama kegiatan berlangsung. Di sisi lain, saya juga tetap memiliki pengalaman dalam beberapa project UI/UX, terutama dalam membuat desain dan memikirkan bagaimana sebuah aplikasi dapat digunakan dengan mudah.",

  "Menurut saya, pengalaman dari berbagai bidang justru membuat saya punya banyak hal untuk dipelajari. Saya senang mencoba hal baru, bertemu dan bekerja sama dengan orang lain, serta mencari pengalaman yang bisa membantu saya berkembang ke depannya."
];


const skills: string[] = [
  "UI/UX Designer",
  "Event Management",
  "Project Management",
  "Public Relations",
  "Creative Thinking",
];

// ── Timeline ──────────────────────────────────────────────────────────────────
interface TimelineItem {
  year: string;
  title: string;
  description: string;
}


const timeline: TimelineItem[] = [
   { 
    year: "2024 - Sekarang", 
    title: "SMK Telkom Malang", 
    description: "Siswa jurusan Rekayasa Perangkat Lunak (RPL). Mempelajari dasar UI/UX design mulai dari riset pengguna, wireframing, hingga prototyping, serta pengalaman dalam event management seperti perencanaan dan koordinasi acara." 
  },
  // Contoh format:
  // { year: "2024", title: "SMK Telkom Malang", description: "Mulai belajar web development." },
  // TODO: isi manual
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function AboutClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced || !heroRef.current) return;

      const children = Array.from(heroRef.current.children);
      gsap.from(children, {
        opacity: 0,
        y: 30,
        stagger: 0.12,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.2,
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="min-h-screen py-20">
      <div className="container mx-auto px-6 max-w-4xl">

        {/* ── Hero / Headline ─────────────────────────────────────────────── */}
        <div ref={heroRef} className="mb-20">

          {/* 2-column grid: photo left, text right */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* ── Left: Profile Photo ── */}
            <motion.div
              className="relative flex justify-center lg:justify-start order-2 lg:order-1"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative">
                {/* Decorative blobs */}
                <div className="absolute -top-6 -left-6 w-64 h-64 rounded-full blur-3xl animate-blob pointer-events-none" style={{ backgroundColor: "rgba(255,200,221,0.3)" }} />
                <div className="absolute -bottom-6 -right-6 w-64 h-64 rounded-full blur-3xl animate-blob-delayed pointer-events-none" style={{ backgroundColor: "rgba(188,224,255,0.35)" }} />

                {/* Photo frame */}
                <motion.div
                  className="relative z-10 w-72 h-72 lg:w-80 lg:h-80 rounded-3xl overflow-hidden ring-4 ring-white/10 shadow-2xl"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  <Image
                    src="/img/profile/ulil2.jpeg"
                    alt="Foto profil Putri"
                    fill
                    unoptimized
                    className="object-cover"
                    priority
                  />
                  {/* Gradient overlay bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </motion.div>

              </div>
            </motion.div>

            {/* ── Right: Text Content ── */}
            <div className="space-y-6 order-1 lg:order-2">
             
              

              {/* Name & Title */}
              <div>
                <h1 className="text-5xl lg:text-6xl font-bold mb-3">
                  <span className="text-gray-900">{heroData.name}</span>
                </h1>
                <p className="text-xl lg:text-2xl font-semibold" style={{ color: "#c05878" }}>
                  {heroData.title} {/* TODO: sesuaikan */}
                </p>
              </div>

              {/* Short Bio */}
              <p className="text-base text-zinc-600 leading-relaxed">
                {heroData.bio} {/* TODO: isi bio singkat di heroData di atas */}
              </p>
            </div>

          </div>
        </div>

        {/* ── Bio Lengkap ─────────────────────────────────────────────────── */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-0.5 rounded-full" style={{ backgroundColor: "#FFC8DD" }} />
            <h2 className="text-2xl font-bold text-gray-900">Biografi</h2>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-black/5 backdrop-blur-sm border border-black/10 p-8 space-y-4">
            {/* Gradient accent top-left */}
            <div className="absolute -top-20 -left-20 w-60 h-60 rounded-full blur-3xl pointer-events-none" style={{ backgroundColor: "rgba(255,200,221,0.15)" }} />

            {fullBio.map((paragraph, i) => (
              <p
                key={i}
                className="text-zinc-600 leading-relaxed relative z-10"
              >
                {paragraph}
                {/* TODO: ganti teks placeholder di atas dengan bio asli kamu */}
              </p>
            ))}
          </div>
        </motion.section>

        {/* ── Skills ──────────────────────────────────────────────────────── */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-0.5 rounded-full" style={{ backgroundColor: "#BCE0FF" }} />
            <h2 className="text-2xl font-bold text-gray-900">Skill</h2>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-black/5 backdrop-blur-sm border border-black/10 p-8">
            <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full blur-3xl pointer-events-none" style={{ backgroundColor: "rgba(188,224,255,0.2)" }} />

            {skills.length > 0 ? (
              <div className="flex flex-wrap gap-3 relative z-10">
                {skills.map((skill) => (
                  <motion.span
                    key={skill}
                    className="px-4 py-2 bg-black/5 backdrop-blur-sm border border-black/15 rounded-full text-sm font-medium text-zinc-600 hover:text-gray-900 transition-colors duration-200"
                    style={{} as React.CSSProperties}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(188,224,255,0.8)";
                      (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(188,224,255,0.15)";
                      (e.currentTarget as HTMLElement).style.color = "#2a5a8a";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = "";
                      (e.currentTarget as HTMLElement).style.backgroundColor = "";
                      (e.currentTarget as HTMLElement).style.color = "";
                    }}
                    whileHover={{ scale: 1.06, y: -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            ) : (
              /* Empty state — akan hilang begitu skills diisi */
              <div className="flex flex-col items-center justify-center py-8 text-center relative z-10">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-zinc-500 text-sm">
                  {/* TODO: isi array `skills` di bagian atas file ini */}
                  Skills belum diisi — tambahkan ke array <code style={{ color: "#c05878", backgroundColor: "#fff0f5" }} className="px-1 rounded">skills</code> di file ini.
                </p>
              </div>
            )}
          </div>
        </motion.section>

        {/* ── Timeline / Pengalaman ────────────────────────────────────────── */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-0.5 rounded-full" style={{ backgroundColor: "#FFC8DD" }} />
            <h2 className="text-2xl font-bold text-gray-900">Pengalaman &amp; Pendidikan</h2>
          </div>

          <AnimatePresence mode="wait">
            {timeline.length > 0 ? (
              /* Timeline list — ditampilkan saat array sudah diisi */
              <div className="relative pl-8">
                {/* Vertical line */}
                <div className="absolute left-3 top-2 bottom-2 w-px" style={{ backgroundColor: "rgba(255,200,221,0.8)" }} />

                <div className="space-y-10">
                  {timeline.map((item, i) => (
                    <motion.div
                      key={i}
                      className="relative"
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.5, delay: i * 0.08, ease: [0.4, 0, 0.2, 1] }}
                    >
                      {/* Dot */}
                      <div className="absolute -left-8 top-1.5 w-3 h-3 rounded-full border-2 border-white" style={{ backgroundColor: "#FFC8DD", boxShadow: "0 2px 8px rgba(255,200,221,0.6)" }} />

                      {/* Card */}
                      <div className="relative overflow-hidden rounded-xl bg-black/5 backdrop-blur-sm border border-black/10 p-6 hover:border-black/20 transition-colors duration-300">
                        <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: "rgba(255,200,221,0.06)" }} />
                        <div className="relative z-10">
                          <span className="inline-block px-3 py-0.5 text-xs font-medium rounded-full mb-3"
                            style={{ backgroundColor: "#fff0f5", border: "1px solid rgba(255,200,221,0.7)", color: "#c05878" }}>
                            {item.year}
                          </span>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                          <p className="text-zinc-600 text-sm leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              /* Empty state — akan hilang begitu timeline diisi */
              <motion.div
                key="timeline-empty"
                className="relative overflow-hidden rounded-2xl bg-black/5 backdrop-blur-sm border border-black/10 p-10 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: "rgba(255,200,221,0.06)" }} />
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-zinc-500 text-sm">
                    {/* TODO: isi array `timeline` di bagian atas file ini */}
                    Timeline belum diisi — tambahkan ke array <code style={{ color: "#7f9cf5", backgroundColor: "#eef2ff" }} className="px-1 rounded">timeline</code> di file ini.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>

        {/* ── CTA ─────────────────────────────────────────────────────────── */}
        <motion.div
          className="text-center"
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
