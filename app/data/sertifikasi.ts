export interface CertificateItem {
  id: number;
  name: string;
  image: string;
  issuer: string;  // penyelenggara/lembaga
  date: string;    // isi bebas, mis. "2024" atau "Januari 2024"
}

export const arraySertifikasi: CertificateItem[] = [
  {
    id:1,
    name:"Competency Certificate",
    image: "/img/sertifikat/UKK.png",
    issuer:"SMK Telkom Malang",
    date:"Juni 2026"  ,
  },
  {
    id: 2,
    name:"Peserta Kategori BMC",
    image: "/img/sertifikat/techsprint.png",
    issuer:"Codelab Indonesia",
    date:"Mei 2026"  ,
  },
  {
    id: 3,
    name:"Intro To Digital Marketing",
    image: "/img/sertifikat/revou.png",
    issuer:"Revou",
    date:"Juni 2026"  ,
  },
  {
    id: 4,
    name: "Seminar Next Frame 2025",
    image: "/img/sertifikat/nextframe.png",
    issuer:"Indevpro Fakultas Teknologi Informasi Universitas Merdeka Malang ",
    date:"Agustus 2025"  ,
  },
];
