export interface OrganisasiItem {
  id: number;
  nama: string;       // nama organisasi / kegiatan
  deskripsi: string;  // deskripsi singkat / ditampilkan di modal
  periode?: string;   // opsional, mis. "2024 – Sekarang"
  role?: string;      // opsional — peran/jabatan, mis. "Ketua", "Anggota"
  image?: string;     // opsional — kosong/undefined → placeholder fallback
}

export const arrayOrganisasi: OrganisasiItem[] = [
  {
    id: 1,
    nama: "GT2K 4",
    deskripsi:
      "Berperan sebagai Ketua dan Sutradara pembuatan video edukasi GT2K 4 yang diselenggarakan oleh UNIKAMA dan berhasil mendapatkan juara 3 tingkat Jawa Timur",
    periode: "Februari 2025",
    image: "/img/organisasi/gt24k.jpeg", // ganti dengan path file asli jika ada
  },
  {
    id: 2,
    nama: "Ketua Program Moklet Serve",
    deskripsi:
      "Berperan Sebagai Ketua Program Moklet Serve yang merupakan program pengabdian masyarakat yang melibatkan siswa-siswi SMK Telkom Malang dalam penerapan keterampilan digital dan kepedulian sosial melalui pemberian materi edukasi bagi murid Sekolah Dasar.",
    periode: "September 2025",
    image: "/img/organisasi/moklet serve.png", 
  },
  {
    id: 3,
    nama: "Perkemahan Jumat Sabtu (Perjusa) 2026",
    deskripsi:
      "Berperan sebagai bendahara dalam acara Perjusa 2026 yang merupakan acara rutin tahunan Dewan Ambalan SMK Telkom Malang",
    periode: "Agustus 2026",
    image:"/img/organisasi/perjusa.png",
  },
  {
    id: 4,
    nama: "Pemilihan Ketua Sub Organ MEMO",
    deskripsi:
      "Berperan sebagai Ketua Divisi Humas dalam acara Pemilihan Ketua Sub Organ MEMO dengan tanggung jawab Memimpin penyiapan dan penyebaran informasi terkait alur, syarat, dan jadwal tahapan pemilihan ketua serta Mengoordinasikan publikasi acara untuk memublikasikan informasi proses regenerasi secara transparan.",
    periode: "Maret 2026",
    image:"/img/organisasi/humas.png",
  },
  {
    id: 5,
    nama: "Dewan Ambalan Bidang Rumah Tangga ",
    deskripsi:
      "Bertugas mengelola Inventaris dan Aset Dewan Ambalan, termasuk pencatatan, pendataan, dan pemeliharaan barang-barang inventaris yang dimiliki oleh dewan ambalan.",
    periode: "November 2025 – Oktober 2026",
    image:"/img/organisasi/RT.jpeg",
  },
  {
    id: 6,
    nama: "Moklet Investigation ",
    deskripsi:"Berperan sebagai produser dan penulis naskah dalam pembuatan video investigasi mengenai fenomena di industri yang diadakan oleh SMK Telkom Malang",
    periode:"Januari 2026",
    image:"/img/organisasi/move.png",
  },
  {
    id: 7,
    nama:"Staff Operasional Bazaar DIESNAT SMK Telkom Malang ke-34",
    deskripsi: "Bertugas bertanggung jawab dalam membantu kelancaran seluruh rangkaian operasional yang diperlukan selama kegiatan berlangsung",
    periode: "September 2025",
    image:"/img/organisasi/disnat.png",
  }
];
