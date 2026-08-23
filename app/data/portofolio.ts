export interface ProjectFeature {
  title: string;
  description: string;
}

export interface PortofolioItem {
  id: number;
  name: string;
  image: string;
  description: string;
  role: string;           // peran/kontribusi per project, mis. "Full-Stack Developer", "Frontend Lead"
  overview: string;       // paragraf overview asli per project
  tools: string[];        // daftar tools/tech stack asli per project
  features: ProjectFeature[]; // isi manual per project
  repoUrl?: string;       // URL repo GitHub (opsional — isi manual, kosongkan jika belum ada)
}


export const arrayPorto: PortofolioItem[] = [
  {
    id: 1,
    name: "PDAM App",
    image: "/img/produk/project pdam.jpeg",
    description: "Aplikasi manajemen pelanggan PDAM berbasis aplikasi android yang dirancang khusus untuk memudahkan staf PDAM dalam mengelola data pelanggan, tagihan, pembayaran, dan laporan bulanan secara terintegrasi.",
    role: "UI/UX Designer",               
    overview: "Aplikasi ini dirancang khusus untuk memudahkan staf PDAM dalam mengelola data pelanggan, tagihan, pembayaran, dan laporan bulanan secara terintegrasi",             
    tools: ["Figma"],                  
    repoUrl: "https://www.figma.com/design/NWI3qpqmXZxfGECRqLWAUd/PDAM-UKL?node-id=1856-4955&t=aPXaZFratoFvYwls-1", 
    features: [
      {
        title: "Export Laporan",
        description: "Fitur ini memudahkan admin memantau seluruh transaksi yang terjadi di platform dengan menyediakan opsi ekspor data pesanan ke format CSV maupun PDF."
      },
      {
        title: "Verifikasi Pembayaran",
        description: "Menangani proses konfirmasi pembayaran atas pesanan yang masuk, memastikan status transaksi hanya berubah menjadi terverifikasi setelah melalui pengecekan yang sesuai di backend."
      },
      {
        title: "Dashboard Manajemen User",
        description: "Dashboard khusus admin untuk mengatur user.",
      },
      {
        title: "Dashboard Pelanggan",
        description: "Dashboard khusus pelanggan untuk melihat tagihan dan pembayaran.",
      }
    ],
  },
  {
    id: 2,
    name: "ACADEMIX",
    image: "/img/produk/app academix.jpeg",
    description: "Platform aplikasi mobile yang bertujuan untuk membantu siswa dalam belajar",
    role: "UI/UX Designer",               
    overview: "Academix adalah sebuah platform yang menyediakan modul pembelajaran interaktif yang dirancang khusus untuk mendukung metode belajar mandiri. Dengan fokus pada materi yang disajikan secara visual menarik dan mudah diikuti, Academix memungkinkan pengguna untuk mengakses pelajaran kapan saja dan di mana saja sesuai dengan ritme belajar mereka. Selain menyediakan materi esensial, platform ini juga dilengkapi fitur penilaian dan pelacakan kemajuan, membantu siswa mengukur pemahaman mereka sekaligus menjaga motivasi selama proses belajar.",             
    tools: ["Figma"],
    repoUrl: "https://www.figma.com/design/XGa4CDt3iS4gke8StHcUbI/31_Ulil-Naumi-Putri?node-id=3963-13005&t=equJd0DdeFmnSoU0-1",               
    features: [
      {
        title: "Assessment dan Recomendation",
        description: "Berfungsi sebagai pemberian tugas kepada user berdasarkan minat dan preferensi mereka.",
      },
      {
        title: "Sertifikat Resmi",
        description:"User akan mendapatkan sertifikat resmi setelah menyelesaikan pelajaran yang tersedia."
      },
      {
        title: "Learning Path",
        description:"Berfungsi sebagai penentuan alur belajar user."
      }
    ],             
  },
  
    ]             
  

