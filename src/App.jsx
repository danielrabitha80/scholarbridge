import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Bookmark, 
  BookmarkCheck, 
  Calendar, 
  ExternalLink, 
  CheckCircle2, 
  GraduationCap, 
  Globe2, 
  Award, 
  FileText, 
  Filter, 
  X, 
  Sparkles, 
  BookOpen, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  ArrowRight, 
  Building2, 
  ChevronRight,
  SlidersHorizontal,
  FileCheck,
  Languages,
  Check,
  Info,
  CalendarDays,
  Coins,
  DollarSign,
  TrendingUp,
  Tag,
  BadgePercent,
  Megaphone,
  Briefcase,
  Calculator,
  Wallet,
  PiggyBank,
  Receipt,
  Plane,
  HeartPulse,
  CreditCard,
  Percent,
  HelpCircle,
  Share2
} from 'lucide-react';

// --- DATASET BEASISWA RESMI DENGAN ESTIMASI KEUANGAN RIIL (RUPIAH & VALAS) ---
const SCHOLARSHIPS_DATA = [
  {
    id: 'lpdp-reguler',
    title: 'Beasiswa LPDP Reguler & Afirmasi',
    sponsor: 'Kementerian Keuangan RI (LPDP)',
    country: 'Inggris / Britania Raya & Global',
    region: 'Global',
    levels: ['S2', 'S3'],
    coverage: 'Fully Funded',
    deadline: '2025-06-30',
    status: 'Open',
    officialUrl: 'https://lpdp.kemenkeu.go.id',
    overview: 'Program beasiswa penuh dari pemerintah Indonesia untuk menempuh jenjang Magister & Doktoral di perguruan tinggi terbaik dunia maupun dalam negeri.',
    // Komponen Finansial
    financials: {
      currency: 'GBP',
      rate: 20400,
      tuitionTotal: 26000,
      monthlyStipend: 1550, // ~Rp 31,6 jt/bln
      durationMonths: 12,
      settlementAllowance: 1550,
      flightTicketsPP: 1200,
      visaAndIHS: 1100,
      bookAllowance: 700,
      // Total paket otomatis terhitung ~£50.250 atau ~Rp 1,02 Miliar
      estTotalIDR: 'Rp 1,02 Miliar',
      estMonthlyIDR: 'Rp 31,6 Juta / bln'
    },
    benefits: [
      'Dana Pendidikan (SPP / Tuition Fee penuh tanpa plafon)',
      'Living Allowance bulanan ~£1.550 (Rp 31,6 Juta/bln) ditransfer ke rekening pribadi',
      'Dana Kedatangan (Settlement Allowance) ~£1.550 (Rp 31,6 Juta) dibayar 1x diawal',
      'Tiket pesawat PP Indonesia-UK, Visa Pelajar, dan Asuransi Kesehatan NHS (IHS)'
    ],
    requirements: [
      'WNI dan telah menyelesaikan D4/S1 atau S2',
      'IPK minimal 3.00 (S2) atau 3.25 (S3) pada skala 4.00',
      'Sertifikat Bahasa: IELTS min. 6.5 / TOEFL iBT 80 (Luar Negeri)',
      'Surat Rekomendasi Akademik / Tokoh Masyarakat',
      'Esai Komitmen Kembali ke Indonesia & Rencana Kontribusi'
    ],
    featuredBadge: 'Favorit Nasional'
  },
  {
    id: 'chevening-uk',
    title: 'Chevening UK Government Scholarship',
    sponsor: 'Foreign, Commonwealth & Development Office (UK)',
    country: 'Inggris / Britania Raya',
    region: 'Eropa',
    levels: ['S2'],
    coverage: 'Fully Funded',
    deadline: '2025-11-05',
    status: 'Upcoming',
    officialUrl: 'https://www.chevening.org',
    overview: 'Beasiswa global bergengsi dari pemerintah Inggris bagi calon pemimpin masa depan untuk studi Magister 1 tahun di universitas mana pun di UK.',
    financials: {
      currency: 'GBP',
      rate: 20400,
      tuitionTotal: 27500,
      monthlyStipend: 1450, // ~Rp 29,5 jt/bln
      durationMonths: 12,
      settlementAllowance: 1000,
      flightTicketsPP: 1300,
      visaAndIHS: 900,
      bookAllowance: 600,
      estTotalIDR: 'Rp 993 Juta',
      estMonthlyIDR: 'Rp 29,5 Juta / bln'
    },
    benefits: [
      'Biaya kuliah penuh (Full tuition fees) tanpa batasan nilai jurusan',
      'Uang saku bulanan £1.450 (Rp 29,5 Juta/bln) bebas pajak',
      'Tiket penerbangan PP Indonesia - UK kelas ekonomi',
      'Tunjangan kedatangan (Arrival Allowance) dan biaya visa Inggris'
    ],
    requirements: [
      'WNI dan berencana kembali ke Indonesia minimal 2 tahun setelah lulus',
      'Memiliki gelar sarjana (S1)',
      'Pengalaman kerja minimal 2 tahun (total 2.800 jam)',
      'Mendaftar ke 3 program master berbeda di universitas UK',
      '4 Esai kepemimpinan, relasi jejaring, rencana karier, dan alasan studi'
    ],
    featuredBadge: 'Paling Populer'
  },
  {
    id: 'fulbright-usa',
    title: 'Fulbright Foreign Student Program (AMINEF)',
    sponsor: 'U.S. Department of State & AMINEF',
    country: 'Amerika Serikat',
    region: 'Amerika',
    levels: ['S2', 'S3'],
    coverage: 'Fully Funded',
    deadline: '2025-04-15',
    status: 'Upcoming',
    officialUrl: 'https://www.aminef.or.id',
    overview: 'Program beasiswa penuh pertukaran pendidikan internasional pemerintah AS untuk menempuh gelar Master atau Ph.D. di universitas terkemuka Amerika Serikat.',
    financials: {
      currency: 'USD',
      rate: 16250,
      tuitionTotal: 76000, // 2 Tahun Master
      monthlyStipend: 2100, // ~Rp 34,1 jt/bln
      durationMonths: 24,
      settlementAllowance: 1500,
      flightTicketsPP: 2200,
      visaAndIHS: 800,
      bookAllowance: 1000,
      estTotalIDR: 'Rp 2,14 Miliar',
      estMonthlyIDR: 'Rp 34,1 Juta / bln'
    },
    benefits: [
      'Pembebasan biaya kuliah kampus AS 2 tahun penuh (~$76.000 USD)',
      'Uang saku bulanan $2.100 (Rp 34,1 Juta/bln) selama 24 bulan',
      'Tiket pesawat PP Indonesia - Amerika Serikat',
      'Asuransi kesehatan menyeluruh dan pengurusan J-1 Visa'
    ],
    requirements: [
      'WNI berprestasi kepemimpinan kuat',
      'Gelar S1 (untuk Master) atau S2 (untuk Ph.D.) dengan IPK min. 3.00',
      'TOEFL ITP min. 550 / TOEFL iBT 80 / IELTS 6.5',
      'Komitmen kembali ke Indonesia setelah menyelesaikan studi'
    ],
    featuredBadge: 'Prestisius'
  },
  {
    id: 'daad-epos',
    title: 'DAAD EPOS (Postgraduate Courses)',
    sponsor: 'Pemerintah Federal Jerman (DAAD)',
    country: 'Jerman',
    region: 'Eropa',
    levels: ['S2', 'S3'],
    coverage: 'Fully Funded',
    deadline: '2025-08-31',
    status: 'Open',
    officialUrl: 'https://www.daad.de',
    overview: 'Beasiswa khusus bagi profesional muda dari negara berkembang untuk studi Magister dan Doktor di Jerman yang berfokus pada pembangunan berkelanjutan.',
    financials: {
      currency: 'EUR',
      rate: 17350,
      tuitionTotal: 1500, // Kampus negeri jerman gratis SPP
      monthlyStipend: 934, // ~Rp 16,2 jt/bln
      durationMonths: 24,
      settlementAllowance: 460,
      flightTicketsPP: 1200,
      visaAndIHS: 1400,
      bookAllowance: 500,
      estTotalIDR: 'Rp 476 Juta',
      estMonthlyIDR: 'Rp 16,2 Juta / bln'
    },
    benefits: [
      'Biaya kuliah di Jerman 100% gratis',
      'Uang saku bulanan €934 (Rp 16,2 Juta/bln) selama 24 bulan studi',
      'Asuransi kesehatan & kecelakaan DAAD komprehensif',
      'Tiket penerbangan PP dan tunjangan riset tahunan'
    ],
    requirements: [
      'Gelar S1 dengan nilai di atas rata-rata',
      'Pengalaman kerja profesional minimal 2 tahun di bidang relevan',
      'Kemampuan bahasa Inggris (IELTS min 6.0) atau Jerman (DSH/TestDaF)',
      'Motivation letter dengan fokus kontribusi pembangunan'
    ],
    featuredBadge: 'Riset Jerman'
  },
  {
    id: 'mext-japan',
    title: 'MEXT Monbukagakusho Scholarship (G to G)',
    sponsor: 'Kemendikbud Jepang (MEXT)',
    country: 'Jepang',
    region: 'Asia',
    levels: ['S1', 'S2', 'S3'],
    coverage: 'Fully Funded',
    deadline: '2025-05-10',
    status: 'Upcoming',
    officialUrl: 'https://www.id.emb-japan.go.jp',
    overview: 'Peluang beasiswa penuh dari Kedutaan Besar Jepang untuk siswa dan sarjana Indonesia melanjutkan studi di universitas ternama di Jepang.',
    financials: {
      currency: 'JPY',
      rate: 108,
      tuitionTotal: 1071600, // 2 Tahun
      monthlyStipend: 144000, // ~Rp 15,5 jt/bln
      durationMonths: 24,
      settlementAllowance: 0,
      flightTicketsPP: 120000,
      visaAndIHS: 40000,
      bookAllowance: 60000,
      estTotalIDR: 'Rp 512 Juta',
      estMonthlyIDR: 'Rp 15,5 Juta / bln'
    },
    benefits: [
      'Bebas biaya pendaftaran, matrikulasi, dan SPP 100%',
      'Uang saku bulanan ¥144.000 (Rp 15,5 Juta/bln) masuk rekening JP Post',
      'Tiket pesawat PP Indonesia - Tokyo/Jepang kelas ekonomi',
      'Kursus intensif bahasa & budaya Jepang gratis 6 bulan'
    ],
    requirements: [
      'WNI, usia di bawah 35 tahun (Pascasarjana) atau di bawah 25 tahun (S1)',
      'Lulus seleksi berkas, tes tulis matematika & bahasa, serta wawancara di Kedubes Jepang',
      'IPK minimal 3.20 (untuk jenjang Pascasarjana)'
    ],
    featuredBadge: 'Bebas Ikatan Kerja'
  },
  {
    id: 'aas-australia',
    title: 'Australia Awards Scholarship (AAS)',
    sponsor: 'Department of Foreign Affairs and Trade (DFAT Australia)',
    country: 'Australia',
    region: 'Oseania',
    levels: ['S2', 'S3'],
    coverage: 'Fully Funded',
    deadline: '2025-04-30',
    status: 'Open',
    officialUrl: 'https://www.australiaawardsindonesia.org',
    overview: 'Program beasiswa internasional bergengsi dari pemerintah Australia yang telah mencetak ribuan tokoh pemimpin dan akademisi di Indonesia.',
    financials: {
      currency: 'AUD',
      rate: 10450,
      tuitionTotal: 76000, // 2 Tahun
      monthlyStipend: 2500, // ~Rp 26,1 jt/bln
      durationMonths: 24,
      settlementAllowance: 5000,
      flightTicketsPP: 1800,
      visaAndIHS: 1800,
      bookAllowance: 1000,
      estTotalIDR: 'Rp 1,52 Miliar',
      estMonthlyIDR: 'Rp 26,1 Juta / bln'
    },
    benefits: [
      'Biaya kuliah penuh di universitas Australia (~$76.000 AUD)',
      'Uang saku bulanan $2.500 AUD (Rp 26,1 Juta/bln)',
      'Establishment allowance awal $5.000 AUD (Rp 52,2 Juta) saat mendarat',
      'Pelatihan Bahasa Inggris pra-keberangkatan (PDT) di Bali/Jakarta dibiayai penuh'
    ],
    requirements: [
      'WNI dan berdomisili di Indonesia saat mendaftar',
      'IPK minimal 2.9 (daerah targeted) atau 3.00',
      'IELTS 5.5 / TOEFL ITP 525 (daerah prioritas/disabilitas mendapat kuota afirmasi)'
    ],
    featuredBadge: 'Pelatihan Gratis'
  },
  {
    id: 'erasmus-mundus',
    title: 'Erasmus Mundus Joint Masters (EMJM)',
    sponsor: 'Uni Eropa (European Commission)',
    country: 'Multi-Negara (Prancis, Jerman, Italia, Spanyol)',
    region: 'Eropa',
    levels: ['S2'],
    coverage: 'Fully Funded',
    deadline: '2025-01-15',
    status: 'Closed',
    officialUrl: 'https://erasmus-plus.ec.europa.eu',
    overview: 'Program magister terintegrasi di mana Anda akan belajar di minimal dua negara Eropa yang berbeda dan meraih gelar ganda (joint/double degree).',
    financials: {
      currency: 'EUR',
      rate: 17350,
      tuitionTotal: 18000,
      monthlyStipend: 1400, // ~Rp 24,2 jt/bln
      durationMonths: 24,
      settlementAllowance: 1000,
      flightTicketsPP: 2000,
      visaAndIHS: 1000,
      bookAllowance: 500,
      estTotalIDR: 'Rp 973 Juta',
      estMonthlyIDR: 'Rp 24,2 Juta / bln'
    },
    benefits: [
      'Pembebasan seluruh biaya registrasi dan kuliah di universitas Uni Eropa',
      'Uang saku bulanan €1.400 (Rp 24,2 Juta/bln) selama 24 bulan penuh',
      'Asuransi kesehatan internasional dan biaya mobilitas lintas negara Eropa'
    ],
    requirements: [
      'Lulusan S1 atau mahasiswa tahun akhir yang akan lulus sebelum program dimulai',
      'Kemampuan bahasa Inggris tinggi (IELTS 6.5 - 7.0 tergantung konsorsium)',
      'Motivation letter & Curriculum Vitae format Europass'
    ],
    featuredBadge: 'Multi-Negara'
  },
  {
    id: 'gks-korea',
    title: 'Global Korea Scholarship (GKS / KGSP)',
    sponsor: 'National Institute for International Education (Korea)',
    country: 'Korea Selatan',
    region: 'Asia',
    levels: ['S1', 'S2', 'S3'],
    coverage: 'Fully Funded',
    deadline: '2025-03-15',
    status: 'Closed',
    officialUrl: 'https://www.studyinkorea.go.kr',
    overview: 'Beasiswa penuh pemerintah Korea Selatan untuk mendukung kerja sama internasional melalui pertukaran pendidikan di kampus top Korea.',
    financials: {
      currency: 'USD',
      rate: 16250,
      tuitionTotal: 22000,
      monthlyStipend: 900, // ~Rp 14,6 jt/bln (1.200.000 KRW)
      durationMonths: 24,
      settlementAllowance: 200,
      flightTicketsPP: 1000,
      visaAndIHS: 600,
      bookAllowance: 400,
      estTotalIDR: 'Rp 744 Juta',
      estMonthlyIDR: 'Rp 14,6 Juta / bln'
    },
    benefits: [
      'Biaya kuliah 100% lunas ditanggung pemerintah Korea',
      'Uang saku bulanan 1.000.000 - 1.300.000 KRW (~Rp 14,6 Juta/bln)',
      'Tiket pesawat PP dan kursus bahasa Korea 1 tahun di universitas lokal'
    ],
    requirements: [
      'Warga negara selain Korea dan kedua orang tua bukan warga negara Korea',
      'IPK di atas 80% dari skala 100',
      'Kondisi kesehatan prima jasmani dan rohani'
    ],
    featuredBadge: 'K-Culture'
  }
];

// --- DATASET HIBAH RISET (RESEARCH GRANTS) ---
const RESEARCH_GRANTS_DATA = [
  {
    id: 'brin-riim',
    title: 'Riset dan Inovasi untuk Indonesia Maju (RIIM)',
    institution: 'Badan Riset dan Inovasi Nasional (BRIN) & LPDP',
    fundingAmount: 'Rp 200 Juta - Rp 1.5 Miliar / Tahun',
    duration: '1 - 3 Tahun',
    deadline: '2025-07-31',
    status: 'Open',
    scope: 'Pangan, Energi, Kesehatan, Kebencanaan, Digital AI, Material Maju',
    eligibility: 'Perguruan Tinggi, Lembaga Litbang, Dosen/Peneliti ber-NIDN dan bereputasi publikasi',
    officialUrl: 'https://pendanaan-risnov.brin.go.id'
  },
  {
    id: 'jsps-postdoc',
    title: 'JSPS Postdoctoral Fellowships for Research in Japan',
    institution: 'Japan Society for the Promotion of Science (JSPS)',
    fundingAmount: '¥362.000/bln + Travel + Research Grant ¥1.500.000',
    duration: '12 - 24 Bulan',
    deadline: '2025-09-02',
    status: 'Upcoming',
    scope: 'Semua Bidang Ilmu Pengetahuan Alam, Sosial, dan Humaniora',
    eligibility: 'Lulusan S3 (Ph.D.) dalam kurun waktu 6 tahun terakhir dan memiliki calon Host Professor di Jepang',
    officialUrl: 'https://www.jsps.go.jp'
  },
  {
    id: 'wellcome-trust',
    title: 'Wellcome Early-Career Awards in Global Health',
    institution: 'Wellcome Trust (United Kingdom)',
    fundingAmount: 'Hingga £400,000 (~Rp 8 Miliar)',
    duration: 'Hingga 5 Tahun',
    deadline: '2025-10-18',
    status: 'Upcoming',
    scope: 'Kesehatan Global, Epidemiologi, Penyakit Menular, Biomedis',
    eligibility: 'Peneliti awal (early career) dari negara berkembang dengan afiliasi institusi yang diakui',
    officialUrl: 'https://wellcome.org'
  },
  {
    id: 'daad-research-grants',
    title: 'DAAD Research Grants - Short-Term & One-Year Grants',
    institution: 'German Academic Exchange Service (DAAD)',
    fundingAmount: '€1,300/bulan + Asuransi + Travel Allowance',
    duration: '1 - 12 Bulan',
    deadline: '2025-08-31',
    status: 'Open',
    scope: 'Semua disiplin ilmu untuk kandidat doktor atau postdoc',
    eligibility: 'Mahasiswa S3 atau peneliti yang telah memiliki invitation letter dari profesor di Jerman',
    officialUrl: 'https://www.daad.de'
  }
];

// --- PORTAL RESMI BEASISWA TERVERIFIKASI ---
const OFFICIAL_PORTALS = [
  { name: 'Portal Resmi LPDP Kemenkeu', url: 'https://lpdp.kemenkeu.go.id', authority: 'Kemenkeu RI', verified: true },
  { name: 'AMINEF Indonesia (Fulbright)', url: 'https://www.aminef.or.id', authority: 'Kedutaan Besar AS', verified: true },
  { name: 'British Council & Chevening UK', url: 'https://www.chevening.org', authority: 'Pemerintah Inggris', verified: true },
  { name: 'DAAD Indonesia (Studi di Jerman)', url: 'https://www.daad-indonesia.org', authority: 'Pemerintah Jerman', verified: true },
  { name: 'Kedutaan Besar Jepang (MEXT)', url: 'https://www.id.emb-japan.go.jp', authority: 'Kedubes Jepang di Jakarta', verified: true },
  { name: 'Australia Awards Indonesia (AAS)', url: 'https://www.australiaawardsindonesia.org', authority: 'DFAT Australia', verified: true },
  { name: 'Study in Korea (GKS/KGSP NIIED)', url: 'https://www.studyinkorea.go.kr', authority: 'Kementerian Pendidikan Korea', verified: true },
  { name: 'Beasiswa Pendidikan Indonesia (BPI)', url: 'https://beasiswa.kemdikbud.go.id', authority: 'Kemendikbudristek RI', verified: true }
];

// --- DATASET VALUASI & ESTIMASI KEUANGAN BEASISWA ---
const SCHOLARSHIP_VALUATION_PRESETS = [
  {
    id: 'lpdp-uk',
    name: 'LPDP Kemenkeu - Magister Luar Negeri (UK / London Area)',
    currency: 'GBP',
    countryName: 'Inggris / UK',
    flag: '🇬🇧',
    durationMonths: 12,
    tuitionFeePerYear: 26000,
    monthlyStipend: 1550,
    settlementAllowance: 1550,
    flightTicketsPP: 1200,
    visaAndIHS: 1100,
    bookAndEmergency: 700,
    typicalExpenses: {
      rent: 850,
      food: 280,
      transport: 110,
      misc: 90
    },
    notes: 'Estimasi untuk Master 1 tahun di UK (Kota Non-London £1,350/bln, London £1,550-£1,650/bln).'
  },
  {
    id: 'chevening-uk',
    name: 'Chevening UK Scholarship - Master 1 Tahun',
    currency: 'GBP',
    countryName: 'Inggris Raya',
    flag: '🇬🇧',
    durationMonths: 12,
    tuitionFeePerYear: 27500,
    monthlyStipend: 1450,
    settlementAllowance: 1000,
    flightTicketsPP: 1300,
    visaAndIHS: 900,
    bookAndEmergency: 600,
    typicalExpenses: {
      rent: 750,
      food: 260,
      transport: 100,
      misc: 90
    },
    notes: 'Chevening membiayai 100% SPP tanpa batasan plafon, ditambah jejaring diplomatik internasional.'
  },
  {
    id: 'fulbright-usa',
    name: 'Fulbright Foreign Student Program (Amerika Serikat)',
    currency: 'USD',
    countryName: 'Amerika Serikat',
    flag: '🇺🇸',
    durationMonths: 24,
    tuitionFeePerYear: 38000,
    monthlyStipend: 2100,
    settlementAllowance: 1500,
    flightTicketsPP: 2200,
    visaAndIHS: 800,
    bookAndEmergency: 1000,
    typicalExpenses: {
      rent: 950,
      food: 400,
      transport: 120,
      misc: 130
    },
    notes: 'Total kalkulasi untuk durasi 2 tahun (24 bulan) jenjang Master di universitas tier-1 AS.'
  },
  {
    id: 'daad-epos',
    name: 'DAAD EPOS Master Program (Jerman)',
    currency: 'EUR',
    countryName: 'Jerman',
    flag: '🇩🇪',
    durationMonths: 24,
    tuitionFeePerYear: 1000,
    monthlyStipend: 934,
    settlementAllowance: 460,
    flightTicketsPP: 1200,
    visaAndIHS: 1400,
    bookAndEmergency: 500,
    typicalExpenses: {
      rent: 420,
      food: 220,
      transport: 30,
      misc: 64
    },
    notes: 'Meskipun universitas negeri Jerman gratis SPP, DAAD memberi uang saku bulanan dan perlindungan asuransi penuh.'
  },
  {
    id: 'mext-japan',
    name: 'MEXT Monbukagakusho Research & Master (Jepang)',
    currency: 'JPY',
    countryName: 'Jepang',
    flag: '🇯🇵',
    durationMonths: 24,
    tuitionFeePerYear: 535800,
    monthlyStipend: 144000,
    settlementAllowance: 0,
    flightTicketsPP: 120000,
    visaAndIHS: 40000,
    bookAndEmergency: 60000,
    typicalExpenses: {
      rent: 48000,
      food: 35000,
      transport: 10000,
      misc: 11000
    },
    notes: 'SPP dan biaya matrikulasi 100% digratiskan oleh kementerian pendidikan Jepang.'
  },
  {
    id: 'aas-australia',
    name: 'Australia Awards Scholarship (AAS Australia)',
    currency: 'AUD',
    countryName: 'Australia',
    flag: '🇦🇺',
    durationMonths: 24,
    tuitionFeePerYear: 38000,
    monthlyStipend: 2500,
    settlementAllowance: 5000,
    flightTicketsPP: 1800,
    visaAndIHS: 1800,
    bookAndEmergency: 1000,
    typicalExpenses: {
      rent: 1100,
      food: 420,
      transport: 150,
      misc: 130
    },
    notes: 'AAS menyediakan pelatihan bahasa gratis (PDT) di Bali/Jakarta sebelum keberangkatan.'
  }
];

export default function App() {
  // State Navigasi Tab
  const [activeTab, setActiveTab] = useState('scholarships'); // 'scholarships' | 'calculator' | 'grants' | 'tools' | 'sources'
  
  // State Filter & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedCoverage, setSelectedCoverage] = useState('All');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // State Bookmark & Modal
  const [bookmarkedIds, setBookmarkedIds] = useState(['lpdp-reguler', 'chevening-uk']);
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);

  // State Monetisasi
  const [showStickyBottomAd, setShowStickyBottomAd] = useState(true);

  // --- STATE KALKULATOR VALUASI & SIMULATOR KEUANGAN BEASISWA ---
  const [selectedValuationPreset, setSelectedValuationPreset] = useState(SCHOLARSHIP_VALUATION_PRESETS[0]);
  const [customMonthlyRent, setCustomMonthlyRent] = useState(SCHOLARSHIP_VALUATION_PRESETS[0].typicalExpenses.rent);
  const [customMonthlyFood, setCustomMonthlyFood] = useState(SCHOLARSHIP_VALUATION_PRESETS[0].typicalExpenses.food);
  const [customMonthlyTransport, setCustomMonthlyTransport] = useState(SCHOLARSHIP_VALUATION_PRESETS[0].typicalExpenses.transport);
  const [customMonthlyMisc, setCustomMonthlyMisc] = useState(SCHOLARSHIP_VALUATION_PRESETS[0].typicalExpenses.misc);

  // Exchange Rates Default (Editable)
  const [exchangeRates, setExchangeRates] = useState({
    GBP: 20400,
    USD: 16250,
    EUR: 17350,
    AUD: 10450,
    JPY: 108
  });

  // Handler saat ganti preset beasiswa
  const handleSelectPreset = (preset) => {
    setSelectedValuationPreset(preset);
    setCustomMonthlyRent(preset.typicalExpenses.rent);
    setCustomMonthlyFood(preset.typicalExpenses.food);
    setCustomMonthlyTransport(preset.typicalExpenses.transport);
    setCustomMonthlyMisc(preset.typicalExpenses.misc);
  };

  // Navigasi cepat dari kartu beasiswa ke simulator
  const handleOpenCalculatorForScholarship = (scholarship) => {
    const matchingPreset = SCHOLARSHIP_VALUATION_PRESETS.find(p => p.id === scholarship.id) || SCHOLARSHIP_VALUATION_PRESETS[0];
    handleSelectPreset(matchingPreset);
    setSelectedScholarship(null);
    setActiveTab('calculator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Perhitungan Keuangan Beasiswa
  const currentRate = exchangeRates[selectedValuationPreset.currency] || 1;
  const durationYears = selectedValuationPreset.durationMonths / 12;

  // 1. Total Nilai Paket Beasiswa (Valas & IDR)
  const totalTuitionValas = selectedValuationPreset.tuitionFeePerYear * durationYears;
  const totalStipendValas = selectedValuationPreset.monthlyStipend * selectedValuationPreset.durationMonths;
  const totalOtherBenefitsValas = 
    selectedValuationPreset.settlementAllowance + 
    selectedValuationPreset.flightTicketsPP + 
    selectedValuationPreset.visaAndIHS + 
    selectedValuationPreset.bookAndEmergency;
  
  const totalPackageValas = totalTuitionValas + totalStipendValas + totalOtherBenefitsValas;
  const totalPackageIDR = totalPackageValas * currentRate;

  // 2. Budgeting & Tabungan Bulanan
  const totalMonthlyExpenseValas = customMonthlyRent + customMonthlyFood + customMonthlyTransport + customMonthlyMisc;
  const monthlySavingsValas = Math.max(0, selectedValuationPreset.monthlyStipend - totalMonthlyExpenseValas);
  const monthlySavingsIDR = monthlySavingsValas * currentRate;
  const totalAccumulatedSavingsIDR = monthlySavingsIDR * selectedValuationPreset.durationMonths;
  const monthlyStipendIDR = selectedValuationPreset.monthlyStipend * currentRate;

  // Perangkat Bantu Checklist State
  const [docChecklist, setDocChecklist] = useState({
    ielts: false,
    cv: true,
    transkrip: true,
    ijazah: true,
    suratRekom: false,
    esai: false,
    paspor: true,
    loa: false
  });

  const toggleChecklist = (key) => {
    setDocChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleBookmark = (id, e) => {
    e?.stopPropagation();
    setBookmarkedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Filter Logic
  const filteredScholarships = useMemo(() => {
    return SCHOLARSHIPS_DATA.filter(item => {
      const query = searchQuery.toLowerCase();
      const matchQuery = 
        item.title.toLowerCase().includes(query) ||
        item.country.toLowerCase().includes(query) ||
        item.sponsor.toLowerCase().includes(query) ||
        item.overview.toLowerCase().includes(query);

      const matchLevel = selectedLevel === 'All' || item.levels.includes(selectedLevel);
      const matchCoverage = selectedCoverage === 'All' || item.coverage === selectedCoverage;
      const matchRegion = selectedRegion === 'All' || item.region === selectedRegion;
      const matchStatus = selectedStatus === 'All' || item.status === selectedStatus;
      const matchBookmark = !showBookmarksOnly || bookmarkedIds.includes(item.id);

      return matchQuery && matchLevel && matchCoverage && matchRegion && matchStatus && matchBookmark;
    });
  }, [searchQuery, selectedLevel, selectedCoverage, selectedRegion, selectedStatus, showBookmarksOnly, bookmarkedIds]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedLevel('All');
    setSelectedCoverage('All');
    setSelectedRegion('All');
    setSelectedStatus('All');
    setShowBookmarksOnly(false);
  };

  const completedDocsCount = Object.values(docChecklist).filter(Boolean).length;
  const totalDocsCount = Object.keys(docChecklist).length;
  const checklistPercentage = Math.round((completedDocsCount / totalDocsCount) * 100);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* 1. HEADER / NAVBAR */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <div 
              className="flex items-center gap-3 cursor-pointer select-none"
              onClick={() => { setActiveTab('scholarships'); resetFilters(); }}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-800 via-indigo-700 to-blue-600 bg-clip-text text-transparent">
                  ScholarBridge
                </span>
                <span className="block text-[10px] tracking-wider uppercase text-slate-400 font-semibold">
                  Info Beasiswa & Perhitungan Dana
                </span>
              </div>
            </div>

            {/* Navigation Tabs Desktop */}
            <nav className="hidden md:flex items-center gap-1 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
              <button
                onClick={() => setActiveTab('scholarships')}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'scholarships' 
                    ? 'bg-white text-blue-700 shadow-sm font-semibold' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Katalog Beasiswa
              </button>
              <button
                onClick={() => setActiveTab('calculator')}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                  activeTab === 'calculator' 
                    ? 'bg-white text-emerald-700 shadow-sm font-semibold' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Calculator className="w-4 h-4 text-emerald-600" />
                <span>Kalkulator Uang & Tabungan</span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.2 rounded-full uppercase">
                  Simulasi
                </span>
              </button>
              <button
                onClick={() => setActiveTab('grants')}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'grants' 
                    ? 'bg-white text-blue-700 shadow-sm font-semibold' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Hibah Riset
              </button>
              <button
                onClick={() => setActiveTab('tools')}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'tools' 
                    ? 'bg-white text-blue-700 shadow-sm font-semibold' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Kit Dokumen
              </button>
              <button
                onClick={() => setActiveTab('sources')}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'sources' 
                    ? 'bg-white text-blue-700 shadow-sm font-semibold' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Portal Resmi
              </button>
            </nav>

            {/* Quick Actions & Bookmark Counter */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveTab('calculator')}
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs sm:text-sm font-semibold hover:bg-emerald-100 transition-all shadow-sm"
                title="Simulasi Perhitungan Finansial Beasiswa"
              >
                <Coins className="w-4 h-4 text-emerald-600" />
                <span>Rincian Uang Saku</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('scholarships');
                  setShowBookmarksOnly(!showBookmarksOnly);
                }}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                  showBookmarksOnly 
                    ? 'bg-amber-50 border-amber-300 text-amber-800 ring-2 ring-amber-400/30' 
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
                title="Lihat Beasiswa Tersimpan"
              >
                <Bookmark className={`w-4 h-4 ${bookmarkedIds.length > 0 ? 'fill-amber-500 text-amber-500' : ''}`} />
                <span className="hidden sm:inline">Tersimpan</span>
                <span className="bg-slate-100 px-1.5 py-0.5 rounded-full text-xs font-semibold text-slate-700">
                  {bookmarkedIds.length}
                </span>
              </button>
            </div>
          </div>

          {/* Navigation Mobile Tab Bar */}
          <div className="md:hidden flex items-center justify-between border-t border-slate-200 py-2.5 overflow-x-auto gap-2">
            <button
              onClick={() => setActiveTab('scholarships')}
              className={`px-3 py-1.5 rounded-md text-xs whitespace-nowrap font-medium ${
                activeTab === 'scholarships' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
              }`}
            >
              Katalog
            </button>
            <button
              onClick={() => setActiveTab('calculator')}
              className={`px-3 py-1.5 rounded-md text-xs whitespace-nowrap font-semibold flex items-center gap-1 ${
                activeTab === 'calculator' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              Hitung Uang Beasiswa
            </button>
            <button
              onClick={() => setActiveTab('grants')}
              className={`px-3 py-1.5 rounded-md text-xs whitespace-nowrap font-medium ${
                activeTab === 'grants' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
              }`}
            >
              Hibah Riset
            </button>
            <button
              onClick={() => setActiveTab('tools')}
              className={`px-3 py-1.5 rounded-md text-xs whitespace-nowrap font-medium ${
                activeTab === 'tools' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
              }`}
            >
              Kit Panduan
            </button>
            <button
              onClick={() => setActiveTab('sources')}
              className={`px-3 py-1.5 rounded-md text-xs whitespace-nowrap font-medium ${
                activeTab === 'sources' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
              }`}
            >
              Sumber Resmi
            </button>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="bg-gradient-to-b from-blue-900 via-indigo-900 to-slate-900 text-white pt-10 pb-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold mb-5 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Portal Informasi Beasiswa Terverifikasi 100% Anti-Hoax</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight sm:leading-none mb-4">
            Raih Pendidikan Dunia &{' '}
            <span className="bg-gradient-to-r from-amber-300 via-emerald-300 to-teal-200 bg-clip-text text-transparent">
              Pendanaan Penuh
            </span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Akses ribuan peluang beasiswa S1, S2, S3, dan hibah riset internasional langsung dari lembaga donor resmi, lengkap dengan panduan finansial dan berkas.
          </p>

          {/* Search Box Terintegrasi */}
          <div className="max-w-2xl mx-auto bg-white p-2 rounded-2xl shadow-xl flex items-center gap-2 border border-slate-200">
            <div className="p-2 text-slate-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="Cari beasiswa (contoh: LPDP, Chevening, Jerman, S2, Riset)..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activeTab !== 'scholarships') setActiveTab('scholarships');
              }}
              className="w-full text-slate-800 placeholder-slate-400 text-sm focus:outline-none"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button 
              onClick={() => setActiveTab('scholarships')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-all shrink-0"
            >
              Cari Info
            </button>
          </div>
        </div>
      </section>

      {/* SLOT IKLAN 1: TOP LEADERBOARD BANNER (Monetisasi Banner) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-5 relative z-20 w-full">
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 rounded-2xl p-3 sm:p-4 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded">
              Iklan Mitra
            </span>
            <div>
              <p className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                <span>Kursus Intensif IELTS & TOEFL iBT Online Garansi Skor 7.0+</span>
                <BadgePercent className="w-4 h-4 text-amber-400 shrink-0" />
              </p>
              <p className="text-[11px] text-slate-300">
                Diskon 40% khusus pendaftar beasiswa bulan ini. Gunakan kode promo: <span className="font-mono font-bold text-amber-300">SCHOLAR40</span>
              </p>
            </div>
          </div>
          <a
            href="https://ielts.org"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto text-center px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 text-xs font-bold rounded-xl transition-all shadow-md shrink-0"
          >
            Klaim Diskon &rarr;
          </a>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        {/* TAB 1: KALKULATOR & SIMULATOR BEASISWA */}
        {activeTab === 'calculator' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-md relative overflow-hidden">
              <div className="max-w-3xl relative z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-3 border border-emerald-400/30">
                  <Coins className="w-4 h-4" /> Financial Valuation & Stipend Simulator
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
                  Berapa Nilai Riil Rupiah yang Anda Dapatkan dari Beasiswa?
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Banyak yang belum menyadari bahwa beasiswa bergengsi bernilai antara <strong className="text-emerald-300">Rp 500 Juta hingga Rp 2 Miliar</strong> per mahasiswa! Simulasikan komponen uang saku, biaya kuliah, serta estimasi sisa tabungan bersih yang bisa Anda kumpulkan.
                </p>
              </div>
              <div className="absolute right-0 bottom-0 translate-x-8 translate-y-8 opacity-10 text-white pointer-events-none">
                <PiggyBank className="w-80 h-80" />
              </div>
            </div>

            {/* Pilihan Preset Beasiswa */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">1. Pilih Preset Beasiswa Target Anda:</h3>
                  <p className="text-xs text-slate-500">Nilai SPP dan uang saku telah disesuaikan dengan standar regulasi resmi</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                  <span className="font-semibold">Mata Uang:</span>
                  <span className="font-mono font-bold text-blue-700">{selectedValuationPreset.currency}</span>
                  <span>(1 {selectedValuationPreset.currency} = Rp {currentRate.toLocaleString('id-ID')})</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                {SCHOLARSHIP_VALUATION_PRESETS.map((preset) => {
                  const isSelected = selectedValuationPreset.id === preset.id;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => handleSelectPreset(preset)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        isSelected 
                          ? 'bg-emerald-50/70 border-emerald-500 ring-2 ring-emerald-500/30' 
                          : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <span className="text-xl">{preset.flag}</span>
                        <span className="text-[11px] font-bold text-slate-700 truncate">{preset.countryName}</span>
                      </div>
                      <div className="text-xs font-bold text-slate-900 line-clamp-1 leading-snug">
                        {preset.name.split('-')[0]}
                      </div>
                      <div className="text-[10px] text-slate-500 mt-1">
                        {preset.durationMonths} Bulan studi ({preset.currency})
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* RINGKASAN TOTAL NILAI BEASISWA (BIG NUMBERS CARDS) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Card 1: Total Valuasi Paket Lengkap */}
              <div className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white rounded-3xl p-6 shadow-md relative overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs uppercase font-bold tracking-wider text-blue-200">Total Nilai Paket Beasiswa</span>
                    <Award className="w-5 h-5 text-amber-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                    Rp {Math.round(totalPackageIDR).toLocaleString('id-ID')}
                  </div>
                  <div className="text-xs text-blue-200 font-mono mt-1">
                    Setara {selectedValuationPreset.currency} {Math.round(totalPackageValas).toLocaleString()}
                  </div>
                </div>
                <div className="pt-4 mt-4 border-t border-blue-800/70 text-[11px] text-blue-200 leading-relaxed">
                  Mencakup perkuliahan 100%, living allowance, tiket PP, visa, asuransi, dan tunjangan awal.
                </div>
              </div>

              {/* Card 2: Living Allowance Masuk Rekening Per Bulan */}
              <div className="bg-gradient-to-br from-emerald-800 to-teal-900 text-white rounded-3xl p-6 shadow-md relative overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs uppercase font-bold tracking-wider text-emerald-200">Uang Saku Bulanan Mahasiswa</span>
                    <Wallet className="w-5 h-5 text-emerald-300" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                    Rp {Math.round(monthlyStipendIDR).toLocaleString('id-ID')}
                    <span className="text-xs font-normal text-emerald-200"> /bln</span>
                  </div>
                  <div className="text-xs text-emerald-200 font-mono mt-1">
                    {selectedValuationPreset.currency} {selectedValuationPreset.monthlyStipend.toLocaleString()} per bulan
                  </div>
                </div>
                <div className="pt-4 mt-4 border-t border-emerald-700/60 text-[11px] text-emerald-200 leading-relaxed">
                  Ditransfer berkala langsung ke rekening bank lokal Anda di negara tujuan studi.
                </div>
              </div>

              {/* Card 3: Potensi Tabungan Rupiah Pasca Wisuda */}
              <div className="bg-gradient-to-br from-amber-700 to-orange-800 text-white rounded-3xl p-6 shadow-md relative overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs uppercase font-bold tracking-wider text-amber-200">Estimasi Akumulasi Tabungan Bersih</span>
                    <PiggyBank className="w-5 h-5 text-amber-300" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                    Rp {Math.round(totalAccumulatedSavingsIDR).toLocaleString('id-ID')}
                  </div>
                  <div className="text-xs text-amber-200 font-mono mt-1">
                    Estimasi tabungan Rp {Math.round(monthlySavingsIDR).toLocaleString('id-ID')} / bulan
                  </div>
                </div>
                <div className="pt-4 mt-4 border-t border-amber-600/60 text-[11px] text-amber-200 leading-relaxed">
                  Total dana yang bisa Anda simpan jika gaya hidup hemat selama {selectedValuationPreset.durationMonths} bulan studi.
                </div>
              </div>
            </div>

            {/* DUA KOLOM: RINCIAN KOMPONEN DANA vs BUDGETING CALCULATOR */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* KOLOM KIRI: BREAKDOWN DANA DIBIAYAI SPONSOR */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-blue-100 text-blue-700 rounded-xl">
                      <Receipt className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Rincian Paket Dana yang Disediakan</h4>
                      <p className="text-xs text-slate-500">Komponen manfaat yang ditanggung 100% oleh donor</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 rounded-full text-slate-700">
                    Durasi: {selectedValuationPreset.durationMonths} Bulan
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  {/* Biaya Kuliah */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <GraduationCap className="w-4 h-4 text-blue-600" />
                      <div>
                        <span className="font-semibold text-slate-800 block">Biaya Kuliah (Tuition Fee Penuh)</span>
                        <span className="text-[11px] text-slate-400">
                          {selectedValuationPreset.currency} {selectedValuationPreset.tuitionFeePerYear.toLocaleString()} / tahun x {durationYears} thn
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-slate-900 block">
                        Rp {Math.round(totalTuitionValas * currentRate).toLocaleString('id-ID')}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {selectedValuationPreset.currency} {totalTuitionValas.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Living Allowance */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <Wallet className="w-4 h-4 text-emerald-600" />
                      <div>
                        <span className="font-semibold text-slate-800 block">Total Uang Saku Hidup ({selectedValuationPreset.durationMonths} Bulan)</span>
                        <span className="text-[11px] text-slate-400">
                          {selectedValuationPreset.currency} {selectedValuationPreset.monthlyStipend.toLocaleString()} x {selectedValuationPreset.durationMonths} bln
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-slate-900 block">
                        Rp {Math.round(totalStipendValas * currentRate).toLocaleString('id-ID')}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {selectedValuationPreset.currency} {totalStipendValas.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Tiket Penerbangan PP */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <Plane className="w-4 h-4 text-sky-600" />
                      <div>
                        <span className="font-semibold text-slate-800 block">Tiket Pesawat Pulang-Pergi (PP)</span>
                        <span className="text-[11px] text-slate-400">Penerbangan internasional kelas ekonomi</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-slate-900 block">
                        Rp {Math.round(selectedValuationPreset.flightTicketsPP * currentRate).toLocaleString('id-ID')}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {selectedValuationPreset.currency} {selectedValuationPreset.flightTicketsPP.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Settlement & Tunjangan Kedatangan */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <Coins className="w-4 h-4 text-amber-600" />
                      <div>
                        <span className="font-semibold text-slate-800 block">Tunjangan Awal Kedatangan (Settlement)</span>
                        <span className="text-[11px] text-slate-400">Diberikan 1x untuk sewa awal & perabotan</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-slate-900 block">
                        Rp {Math.round(selectedValuationPreset.settlementAllowance * currentRate).toLocaleString('id-ID')}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {selectedValuationPreset.currency} {selectedValuationPreset.settlementAllowance.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Asuransi & Visa */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <HeartPulse className="w-4 h-4 text-rose-600" />
                      <div>
                        <span className="font-semibold text-slate-800 block">Asuransi Kesehatan & Biaya Visa Resmi</span>
                        <span className="text-[11px] text-slate-400">Perlindungan medis penuh selama studi</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-slate-900 block">
                        Rp {Math.round(selectedValuationPreset.visaAndIHS * currentRate).toLocaleString('id-ID')}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {selectedValuationPreset.currency} {selectedValuationPreset.visaAndIHS.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-200/80 text-xs text-blue-900 flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Catatan Penyelenggara:</strong> {selectedValuationPreset.notes}
                  </span>
                </div>
              </div>

              {/* KOLOM KANAN: SIMULATOR GAYA HIDUP & SISA TABUNGAN PER BULAN */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 bg-emerald-100 text-emerald-700 rounded-xl">
                        <PiggyBank className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">Simulasi Pengeluaran & Sisa Tabungan Bulanan</h4>
                        <p className="text-xs text-slate-500">Sesuaikan estimasi gaya hidup Anda di negara tujuan</p>
                      </div>
                    </div>
                  </div>

                  {/* Form Pengeluaran Bulanan Mahasiswa */}
                  <div className="space-y-4">
                    {/* Sewa Kamar */}
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-medium text-slate-700">Sewa Kamar / Akomodasi ({selectedValuationPreset.currency})</span>
                        <span className="font-bold text-slate-900">
                          {selectedValuationPreset.currency} {customMonthlyRent} (~Rp {Math.round(customMonthlyRent * currentRate).toLocaleString('id-ID')})
                        </span>
                      </div>
                      <input
                        type="range"
                        min="200"
                        max={selectedValuationPreset.monthlyStipend * 0.85}
                        step="10"
                        value={customMonthlyRent}
                        onChange={(e) => setCustomMonthlyRent(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                    </div>

                    {/* Makan & Groceries */}
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-medium text-slate-700">Makan & Belanja Dapur ({selectedValuationPreset.currency})</span>
                        <span className="font-bold text-slate-900">
                          {selectedValuationPreset.currency} {customMonthlyFood} (~Rp {Math.round(customMonthlyFood * currentRate).toLocaleString('id-ID')})
                        </span>
                      </div>
                      <input
                        type="range"
                        min="80"
                        max={selectedValuationPreset.monthlyStipend * 0.4}
                        step="10"
                        value={customMonthlyFood}
                        onChange={(e) => setCustomMonthlyFood(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                    </div>

                    {/* Transportasi */}
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-medium text-slate-700">Transportasi Pelajar ({selectedValuationPreset.currency})</span>
                        <span className="font-bold text-slate-900">
                          {selectedValuationPreset.currency} {customMonthlyTransport} (~Rp {Math.round(customMonthlyTransport * currentRate).toLocaleString('id-ID')})
                        </span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="250"
                        step="5"
                        value={customMonthlyTransport}
                        onChange={(e) => setCustomMonthlyTransport(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                    </div>

                    {/* Lain-lain & Hiburan */}
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-medium text-slate-700">Pulsa, Internet, & Hiburan Ringan ({selectedValuationPreset.currency})</span>
                        <span className="font-bold text-slate-900">
                          {selectedValuationPreset.currency} {customMonthlyMisc} (~Rp {Math.round(customMonthlyMisc * currentRate).toLocaleString('id-ID')})
                        </span>
                      </div>
                      <input
                        type="range"
                        min="20"
                        max="250"
                        step="5"
                        value={customMonthlyMisc}
                        onChange={(e) => setCustomMonthlyMisc(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                    </div>
                  </div>

                  {/* Cashflow Breakdown Box */}
                  <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>Uang Saku Masuk:</span>
                      <span className="font-semibold text-slate-800">
                        {selectedValuationPreset.currency} {selectedValuationPreset.monthlyStipend.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-rose-600">
                      <span>Total Pengeluaran Anda:</span>
                      <span className="font-semibold">
                        - {selectedValuationPreset.currency} {totalMonthlyExpenseValas.toLocaleString()}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-slate-200 flex justify-between items-center">
                      <span className="font-bold text-slate-900">Sisa Uang Dingin yang Ditabung:</span>
                      <span className="text-sm font-extrabold text-emerald-600">
                        {selectedValuationPreset.currency} {monthlySavingsValas.toLocaleString()} / bln
                      </span>
                    </div>
                    <div className="text-right text-[11px] font-semibold text-emerald-700">
                      Setara Rp {Math.round(monthlySavingsIDR).toLocaleString('id-ID')} per bulan
                    </div>
                  </div>
                </div>

                {/* SLOT IKLAN: REKENING MULTI-CURRENCY & TRANSFER VALAS */}
                <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-600 text-white rounded-xl">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-blue-700 block">Rekomendasi Finansial Pelajar</span>
                      <h5 className="font-bold text-xs sm:text-sm text-slate-900">Buka Rekening Multi-Valas Bebas Biaya Admin</h5>
                      <p className="text-[11px] text-slate-600">Simpan stipend {selectedValuationPreset.currency} & transfer Rupiah ke tanah air dengan kurs terendah.</p>
                    </div>
                  </div>
                  <a
                    href="https://wise.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm"
                  >
                    Buka Akun &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SCHOLARSHIPS DIRECTORY */}
        {activeTab === 'scholarships' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-2 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5" /> Filter:
                </span>

                {/* Jenjang */}
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-xs rounded-lg px-3 py-1.5 font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">Semua Jenjang</option>
                  <option value="S1">S1 (Sarjana)</option>
                  <option value="S2">S2 (Magister)</option>
                  <option value="S3">S3 (Doktoral)</option>
                </select>

                {/* Kawasan */}
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-xs rounded-lg px-3 py-1.5 font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">Semua Kawasan</option>
                  <option value="Eropa">Eropa</option>
                  <option value="Asia">Asia</option>
                  <option value="Amerika">Amerika</option>
                  <option value="Oseania">Oseania / Australia</option>
                  <option value="Global">Global / Multi</option>
                </select>

                {/* Cakupan */}
                <select
                  value={selectedCoverage}
                  onChange={(e) => setSelectedCoverage(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-xs rounded-lg px-3 py-1.5 font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">Semua Cakupan</option>
                  <option value="Fully Funded">Fully Funded (Penuh)</option>
                  <option value="Partial">Partial</option>
                </select>

                {/* Status */}
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-xs rounded-lg px-3 py-1.5 font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">Semua Status</option>
                  <option value="Open">Buka Sekarang</option>
                  <option value="Upcoming">Segera Dibuka</option>
                  <option value="Closed">Tutup</option>
                </select>
              </div>

              {(searchQuery || selectedLevel !== 'All' || selectedRegion !== 'All' || selectedCoverage !== 'All' || selectedStatus !== 'All' || showBookmarksOnly) && (
                <button
                  onClick={resetFilters}
                  className="text-xs text-rose-600 hover:text-rose-700 font-semibold underline"
                >
                  Reset Filter
                </button>
              )}
            </div>

            {/* Grid Katalog Beasiswa */}
            {filteredScholarships.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
                <HelpCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800">Tidak ada beasiswa yang cocok</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Coba kurangi filter pencarian Anda atau periksa kembali kata kunci yang dimasukkan.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700"
                >
                  Tampilkan Semua Beasiswa
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredScholarships.map((scholarship, index) => {
                  const isBookmarked = bookmarkedIds.includes(scholarship.id);

                  return (
                    <React.Fragment key={scholarship.id}>
                      {/* Kartu Beasiswa */}
                      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between overflow-hidden group">
                        <div className="p-5">
                          <div className="flex items-start justify-between gap-2 mb-3">
                            <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                              {scholarship.featuredBadge}
                            </span>
                            <button
                              onClick={(e) => toggleBookmark(scholarship.id, e)}
                              className="text-slate-400 hover:text-amber-500 transition-colors"
                              title={isBookmarked ? "Hapus dari simpanan" : "Simpan beasiswa ini"}
                            >
                              <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
                            </button>
                          </div>

                          <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-1.5">
                            {scholarship.title}
                          </h3>

                          <p className="text-xs text-slate-500 flex items-center gap-1.5 mb-3">
                            <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span className="truncate">{scholarship.sponsor}</span>
                          </p>

                          {/* KOTAK ESTIMASI RUPIAH YANG DITERIMA MAHASISWA */}
                          {scholarship.financials && (
                            <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 p-3 rounded-xl border border-emerald-200/80 mb-3 space-y-1.5">
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-slate-600 font-medium flex items-center gap-1">
                                  <Award className="w-3.5 h-3.5 text-emerald-600" />
                                  Total Nilai Beasiswa:
                                </span>
                                <span className="font-extrabold text-emerald-700">
                                  {scholarship.financials.estTotalIDR}
                                </span>
                              </div>
                              <div className="flex items-center justify-between text-xs pt-1 border-t border-emerald-200/60">
                                <span className="text-slate-600 font-medium flex items-center gap-1">
                                  <Wallet className="w-3.5 h-3.5 text-blue-600" />
                                  Uang Saku Bulanan:
                                </span>
                                <span className="font-bold text-blue-700">
                                  {scholarship.financials.estMonthlyIDR}
                                </span>
                              </div>
                            </div>
                          )}

                          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                            {scholarship.overview}
                          </p>

                          <div className="flex flex-wrap gap-1.5 mb-4">
                            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-[11px] font-medium text-slate-600 flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-slate-400" /> {scholarship.country}
                            </span>
                            <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-[11px] font-semibold text-emerald-700 border border-emerald-200">
                              {scholarship.coverage}
                            </span>
                            {scholarship.levels.map((lvl) => (
                              <span key={lvl} className="px-2 py-0.5 rounded-md bg-indigo-50 text-[11px] font-semibold text-indigo-700">
                                {lvl}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                          <button
                            onClick={() => handleOpenCalculatorForScholarship(scholarship)}
                            className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 underline underline-offset-2"
                          >
                            <Calculator className="w-3.5 h-3.5" />
                            <span>Simulasi Uang</span>
                          </button>
                          <button
                            onClick={() => setSelectedScholarship(scholarship)}
                            className="font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                          >
                            <span>Detail Lengkap</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* IN-FEED NATIVE AD: Disisipkan setelah kartu ke-2 */}
                      {index === 1 && (
                        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-dashed border-amber-300 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-amber-200 text-amber-900">
                                Rekomendasi Terpercaya
                              </span>
                              <Megaphone className="w-4 h-4 text-amber-600" />
                            </div>
                            <h4 className="font-bold text-base text-slate-900 mb-1.5">
                              Jasa Review Esai LPDP & Motivation Letter Native Speaker
                            </h4>
                            <p className="text-xs text-slate-600 leading-relaxed mb-4">
                              Tingkatkan peluang lolos 3x lipat dengan evaluasi esai, proofreading gramatika, dan mock interview bersama alumni penerima beasiswa Harvard, Oxford & Cambridge.
                            </p>
                          </div>
                          <div className="pt-3 border-t border-amber-200/80 flex items-center justify-between">
                            <span className="text-xs font-bold text-amber-800">Mulai Rp 199.000</span>
                            <a
                              href="https://google.com"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded-xl transition-all shadow-sm"
                            >
                              Konsultasi Sekarang &rarr;
                            </a>
                          </div>
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: HIBAH RISET & FELLOWSHIPS */}
        {activeTab === 'grants' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Peluang Hibah Riset & Pendanaan Inovasi</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-xl">
                  Daftar program pendanaan riset ilmiah, postdoctoral fellowship, dan hibah laboratorium untuk dosen, peneliti mandiri, dan ilmuwan Indonesia.
                </p>
              </div>
              <span className="text-xs font-semibold px-3 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-200 shrink-0">
                {RESEARCH_GRANTS_DATA.length} Hibah Terbuka
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {RESEARCH_GRANTS_DATA.map((grant) => (
                <div key={grant.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-blue-300 transition-all">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-bold px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
                        {grant.fundingAmount}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">Durasi: {grant.duration}</span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 leading-snug">{grant.title}</h4>
                    <p className="text-xs text-blue-700 font-semibold">{grant.institution}</p>

                    <div className="bg-slate-50 p-3 rounded-xl space-y-1.5 text-xs">
                      <div>
                        <span className="font-semibold text-slate-700">Fokus Bidang: </span>
                        <span className="text-slate-600">{grant.scope}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-slate-700">Syarat Pengusul: </span>
                        <span className="text-slate-600">{grant.eligibility}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500">
                      Batas Proposal: <strong className="text-slate-800 font-mono">{grant.deadline}</strong>
                    </span>
                    <a
                      href={grant.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex items-center gap-1"
                    >
                      <span>Panduan Resmi</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: KIT ALAT BANTU DOKUMEN & KONVERSI SKOR */}
        {activeTab === 'tools' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Checklist Dokumen Interaktif */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-blue-100 text-blue-700 rounded-xl">
                    <FileCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900">Interactive Document Checklist Generator</h3>
                    <p className="text-xs text-slate-500">Cek kelengkapan berkas wajib sebelum submit aplikasi beasiswa Anda</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500">Progres:</span>
                  <div className="text-sm font-black text-blue-700">{checklistPercentage}% Siap</div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {[
                  { key: 'ielts', label: 'Sertifikat Bahasa (IELTS / TOEFL)' },
                  { key: 'cv', label: 'CV Format Internasional / Europass' },
                  { key: 'transkrip', label: 'Transkrip Nilai Bahasa Inggris' },
                  { key: 'ijazah', label: 'Ijazah Legalisir Bahasa Inggris' },
                  { key: 'suratRekom', label: '2 Surat Rekomendasi Resmi' },
                  { key: 'esai', label: 'Motivation Letter / Proposal Studi' },
                  { key: 'paspor', label: 'Paspor Aktif (Min. 18 Bulan)' },
                  { key: 'loa', label: 'Letter of Acceptance (LoA) Kampus' },
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => toggleChecklist(item.key)}
                    className={`p-3.5 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition-all ${
                      docChecklist[item.key]
                        ? 'bg-blue-50/70 border-blue-400 text-blue-900'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span>{item.label}</span>
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ml-2 ${
                      docChecklist[item.key] ? 'bg-blue-600 text-white' : 'border border-slate-300 bg-white'
                    }`}>
                      {docChecklist[item.key] && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </button>
                ))}
              </div>

              {/* Slot Iklan Penerjemah Tersumpah */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Languages className="w-6 h-6 text-emerald-700 shrink-0" />
                  <div>
                    <h5 className="font-bold text-xs sm:text-sm text-slate-900">Butuh Terjemahan Ijazah & Transkrip Tersumpah (Sworn Translator)?</h5>
                    <p className="text-[11px] text-slate-600">Terdaftar Kemenkumham, resmi diterima kedutaan dan universitas dunia. Selesai 24 jam.</p>
                  </div>
                </div>
                <a
                  href="https://kemenkumham.go.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shrink-0"
                >
                  Pesan Terjemahan &rarr;
                </a>
              </div>
            </div>

            {/* Tabel Konversi Nilai Bahasa Inggris */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-base text-slate-900 mb-2">Tabel Referensi Kesetaraan Skor Bahasa Inggris</h3>
              <p className="text-xs text-slate-500 mb-4">Gunakan patokan ini untuk mencocokkan syarat minimum IELTS, TOEFL iBT, TOEFL ITP, dan Duolingo (DET).</p>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
                  <thead className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                    <tr>
                      <th className="p-3">Level CEFR</th>
                      <th className="p-3">IELTS Academic</th>
                      <th className="p-3">TOEFL iBT</th>
                      <th className="p-3">TOEFL ITP (Prediksi)</th>
                      <th className="p-3">Duolingo (DET)</th>
                      <th className="p-3">Rekomendasi Jenjang</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-blue-700">C2 (Proficient)</td>
                      <td className="p-3 font-semibold">8.5 - 9.0</td>
                      <td className="p-3">115 - 120</td>
                      <td className="p-3">660+</td>
                      <td className="p-3">145 - 160</td>
                      <td className="p-3 text-slate-500">Ph.D. / Law / Kedokteran UK & US</td>
                    </tr>
                    <tr className="hover:bg-slate-50 bg-emerald-50/30">
                      <td className="p-3 font-bold text-emerald-700">C1 (Advanced)</td>
                      <td className="p-3 font-semibold">7.0 - 8.0</td>
                      <td className="p-3">95 - 114</td>
                      <td className="p-3">600 - 650</td>
                      <td className="p-3">125 - 140</td>
                      <td className="p-3 text-emerald-700 font-semibold">Standar Emas Beasiswa S2 Dunia</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-amber-700">B2 (Vantage)</td>
                      <td className="p-3 font-semibold">5.5 - 6.5</td>
                      <td className="p-3">72 - 94</td>
                      <td className="p-3">530 - 580</td>
                      <td className="p-3">95 - 120</td>
                      <td className="p-3 text-slate-500">Minimal S1 & S2 Jalur Afirmasi / Asia</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: PORTAL RESMI BEASISWA */}
        {activeTab === 'sources' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <ShieldCheck className="w-6 h-6 text-emerald-600" />
                <h3 className="text-lg font-bold text-slate-900">Direktori Portal Resmi Lembaga Donor (Anti-Penipuan)</h3>
              </div>
              <p className="text-xs text-slate-500 max-w-2xl">
                Harap selalu berhati-hati terhadap oknum yang memungut biaya pendaftaran atas nama beasiswa. Seluruh beasiswa resmi tidak pernah memungut biaya registrasi.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {OFFICIAL_PORTALS.map((portal, idx) => (
                <a
                  key={idx}
                  href={portal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Terverifikasi
                      </span>
                      <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                    </div>
                    <h4 className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors mb-1">
                      {portal.name}
                    </h4>
                    <p className="text-xs text-slate-500">{portal.authority}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-semibold text-blue-600 flex items-center gap-1">
                    <span>Kunjungi Situs Resmi</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* DETAIL MODAL UNTUK BEASISWA */}
      {selectedScholarship && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 relative animate-in zoom-in-95 duration-150">
            <button
              onClick={() => setSelectedScholarship(null)}
              className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
                {selectedScholarship.coverage}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
                {selectedScholarship.country}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-1">
              {selectedScholarship.title}
            </h2>
            <p className="text-xs text-blue-700 font-semibold mb-4">
              Lembaga Penyelenggara: {selectedScholarship.sponsor}
            </p>

            {/* KOTAK RINCIAN RUPIAH PER BEASISWA */}
            {selectedScholarship.financials && (
              <div className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white shadow-md">
                <div className="flex items-center justify-between mb-3 border-b border-indigo-800/80 pb-2">
                  <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5 uppercase tracking-wider">
                    <Coins className="w-4 h-4" /> Estimasi Perolehan Uang Penerima Beasiswa
                  </span>
                  <span className="text-[11px] text-slate-300">
                    Durasi: {selectedScholarship.financials.durationMonths} Bulan
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-white/10 rounded-xl p-3 border border-white/10">
                    <span className="text-[11px] text-slate-300 block">Total Nilai Paket Beasiswa</span>
                    <span className="text-lg sm:text-xl font-extrabold text-amber-300">
                      {selectedScholarship.financials.estTotalIDR}
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      SPP + Tiket + Asuransi + Uang Saku
                    </span>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3 border border-white/10">
                    <span className="text-[11px] text-slate-300 block">Uang Saku Bersih Masuk Rekening</span>
                    <span className="text-lg sm:text-xl font-extrabold text-emerald-300">
                      {selectedScholarship.financials.estMonthlyIDR}
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      {selectedScholarship.financials.currency} {selectedScholarship.financials.monthlyStipend.toLocaleString()} / bulan
                    </span>
                  </div>
                </div>
              </div>
            )}

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
              {selectedScholarship.overview}
            </p>

            {/* Manfaat Finansial */}
            <div className="mb-6">
              <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Coins className="w-4 h-4 text-emerald-600" /> Komponen Manfaat yang Ditanggung:
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                {selectedScholarship.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Syarat Pendaftaran */}
            <div className="mb-6">
              <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" /> Kriteria & Persyaratan Utama:
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                {selectedScholarship.requirements.map((r, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-200">
              <a
                href={selectedScholarship.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl text-center flex items-center justify-center gap-2 shadow-md"
              >
                <span>Buka Formulir di Portal Resmi</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <button
                onClick={() => handleOpenCalculatorForScholarship(selectedScholarship)}
                className="w-full sm:w-auto py-3 px-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs sm:text-sm rounded-xl border border-emerald-300 flex items-center justify-center gap-1.5"
              >
                <Calculator className="w-4 h-4 text-emerald-600" />
                <span>Simulasikan Uang Saku</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SLOT IKLAN: STICKY BOTTOM FLOATING BANNER */}
      {showStickyBottomAd && (
        <div className="fixed bottom-3 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-40 bg-slate-950/95 backdrop-blur-md text-white border border-slate-800 p-3.5 rounded-2xl shadow-2xl flex items-center justify-between gap-3 animate-in slide-in-from-bottom duration-300">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
            <div className="text-xs">
              <p className="font-bold text-slate-100">Webinar Gratis: Strategi Tembus LPDP & Chevening</p>
              <p className="text-[10px] text-slate-400">Sabtu ini | Kuota sisa 35 peserta</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="https://zoom.us"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-all"
            >
              Daftar
            </a>
            <button
              onClick={() => setShowStickyBottomAd(false)}
              className="text-slate-400 hover:text-white p-1 rounded-md"
              title="Tutup iklan"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-10 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <GraduationCap className="w-4 h-4" />
            </div>
            <span className="text-white font-bold text-sm">ScholarBridge Indonesia</span>
          </div>
          <p className="text-center sm:text-right text-[11px] text-slate-500">
            Seluruh informasi beasiswa dirangkum langsung dari rilis resmi donor. Bebas biaya pendaftaran dan anti-penipuan.
          </p>
        </div>
      </footer>
    </div>
  );
}