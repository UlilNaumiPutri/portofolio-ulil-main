import type { Metadata } from "next";
import { Work_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import Header from "./header";
import LenisProvider from "./providers/LenisProvider";

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portofolio | Putri",
  description: "Portofolio Putri — Project Management",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body className={`${workSans.variable} ${fraunces.variable} font-sans antialiased`}>
        <LenisProvider>
          {/* Wrapper Background */}
          <div className="relative min-h-screen w-screen overflow-hidden">

            {/* Overlay putih tipis untuk menjaga depth */}
            <div className="absolute inset-0 bg-white/30 -z-10"></div>

            {/* Konten */}
            <Header />
            <main className="relative z-10">
              {children}
            </main>

          </div>
        </LenisProvider>
      </body>
    </html>
  );
}
