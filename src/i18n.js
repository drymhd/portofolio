import { ref } from 'vue'

// Get initial locale from localStorage or default to 'en'
const savedLocale = localStorage.getItem('locale') || 'en'
export const currentLocale = ref(savedLocale)

export const staticTranslations = {
  en: {
    // Navbar
    navHome: 'Home',
    navAbout: 'About',
    navServices: 'Services',
    navProjects: 'Projects',
    navContact: 'Contact',
    navLogin: 'Login',
    
    // Hero
    heroGreeting: "Hi, I'm",
    heroSubtitle: 'I build robust, production-grade applications with clean architecture and modern technology.',
    heroViewProjects: 'View Masterpieces',
    heroContactMe: 'Contact Me',
    heroDownloadCV: 'Download CV',
    heroStatus: 'Available for Freelance & Full-time',
    statExp: 'Years Experience',
    statProj: 'Completed Projects',
    statTech: 'Tech Stacks',
    statCert: 'Certifications',
    
    // About
    aboutSubtitle: 'My Background',
    aboutTitle: 'About Me & Credentials',
    aboutTimeline: 'Professional Timeline',
    aboutEduCert: 'Education & Certifications',
    aboutCert: 'Certifications',
    aboutLangs: 'Languages',
    aboutMePart1: 'About',
    aboutMePart2: 'Me',
    aboutWhoIs: 'Who is',
    aboutTechCap: 'Technical Capabilities',
    aboutTabExp: 'Experience',
    aboutTabEdu: 'Education',
    aboutTabCreds: 'Credentials',
    
    // Services
    servicesSubtitle: 'What I Offer',
    servicesTitle: 'Services & Expertises',
    servicesIntro: 'Custom digital engineering designed for reliability, scalability, and performance.',
    servicesTitlePart1: 'My',
    servicesTitlePart2: 'Services',
    serviceDetails: 'Details',
    
    // Projects
    projectsSubtitle: 'My Masterpieces',
    projectsTitle: 'Featured Works & Systems',
    projectsIntro: 'A collection of enterprise-grade logistics platforms, government-level accountability systems, and production-grade mobile applications built for clients across various regions.',
    projectsCtaText: 'Want to see the code structure or discuss architecture designs?',
    projectsCtaBtn: 'View More on GitHub',
    projectsFlagship: 'ENTERPRISE FLAGSHIP SYSTEM',
    catAll: 'All',
    projectsTitlePart1: 'Featured',
    projectsTitlePart2: 'Works & Systems',
    
    // Contact
    contactSubtitle: 'Get In Touch',
    contactTitle: "Let's Build Something Together",
    contactIntro: "Have a project in mind, want to discuss software architecture, or looking to collaborate? Send a message and let's start talking.",
    contactFormName: 'Your Name',
    contactFormEmail: 'Your Email',
    contactFormSubject: 'Subject',
    contactFormMessage: 'Your Message',
    contactFormBtnSend: 'Send Message',
    contactFormBtnSending: 'Sending...',
    contactFormSuccess: 'Message sent successfully! I will get back to you soon.',
    contactMePart2: 'Me',
    contactEmailMe: 'Email Me',
    contactCallWa: 'Call / WA',
    contactFormError: 'Please fill out all fields.',
    
    // Footer
    footerRights: 'All rights reserved.',
    
    // Splash
    splashLoading: 'Initializing digital assets...',
    splashCompiling: 'Building UI subsystems...',
    splashOptimizing: 'Optimizing rendering canvas...',
    splashReady: 'System Ready',
    
    // Login
    loginTitle: 'Admin Access',
    loginSubtitle: 'Enter credentials to access the portfolio controller',
    loginEmail: 'Email Address',
    loginPassword: 'Password',
    loginBtn: 'Login to Dashboard',
    loginError: 'Invalid credentials. Access Denied.',
    loginTip: 'Tip: Use darmah250903@gmail.com and dary123',
    loginSigningIn: 'Signing in...',
    loginBack: 'Back to Portfolio',
    
    // Dashboard
    dashTitle: 'Portfolio Control Panel',
    dashBack: 'Back to Site',
    dashSaving: 'Saving...',
    dashSaveSuccess: 'Changes saved successfully!',
    dashStatsTitle: 'Analytics & Activity Overview',
    dashStatsVisits: 'Monthly System Visits',
    dashStatsTotalProjects: 'Total Projects',
    dashStatsInboxCount: 'Inbox Messages',
    dashTabsProfile: 'Edit Profile',
    dashTabsProjects: 'Projects CRUD',
    dashTabsSkills: 'Skills Manager',
    dashTabsInbox: 'Message Inbox',
    dashTabsRaw: 'Raw Database JSON',
    dashAdminControl: 'Admin Control',
    dashTabsOverview: 'Overview',
    dashOverviewTitle: 'Overview Status',
    dashOverviewSubtitle: 'Real-time metrics of your local portfolio instance.',
    dashStatsVisitsMock: 'Profile Visitors (Mock)',
    dashStatsUnread: 'Unread',
    dashChartTitle: 'Visitor Activity Graph (Weekly Mock)',
    dayMon: 'Mon',
    dayTue: 'Tue',
    dayWed: 'Wed',
    dayThu: 'Thu',
    dayFri: 'Fri',
    daySat: 'Sat',
    daySun: 'Sun',
    
    // Dashboard - Profile
    dashProfileTitle: 'Personal Information',
    dashProfileLocation: 'Location',
    dashProfileAddress: 'Address',
    dashProfileBio: 'Bio Description',
    dashProfileAbout: 'Detailed About Me',
    dashProfileEditTitle: 'Edit Profile Context',
    dashProfileEditSubtitle: 'Change bio and information displayed on the home page.',
    dashProfileName: 'Name',
    dashProfileJobTitle: 'Job Title',
    dashProfileLinkedin: 'LinkedIn Link',
    dashProfileSaveBtn: 'Save Profile Details',
    
    // Dashboard - Projects
    dashProjPanelTitle: 'Projects CRUD Panel',
    dashProjPanelSubtitle: 'Add, edit, or remove entries in the portfolio catalog.',
    dashProjAdd: 'Add New Project',
    dashProjEdit: 'Edit Project',
    dashProjTitle: 'Project Title',
    dashProjDesc: 'Description',
    dashProjCat: 'Category',
    dashProjTags: 'Tags (comma separated)',
    dashProjImage: 'Image URL',
    dashProjLink: 'Project Link',
    dashProjFlagship: 'Flagship Project',
    dashProjDeleteConfirm: 'Are you sure you want to delete this project?',
    dashProjActions: 'Actions',
    dashProjUpdateBtn: 'Update Project',
    dashProjAddBtn: 'Add Project',
    dashBtnCancel: 'Cancel',
    dashProjActiveEntries: 'Active Project Entries',
    dashBtnEdit: 'Edit',
    dashBtnDelete: 'Delete',
    dashProjCatWeb: 'Web App',
    dashProjCatMobile: 'Mobile App',
    dashProjCatApi: 'Backend / API',
    dashProjTitlePlaceholder: 'e.g. Courier Tracker',
    dashProjLinkPlaceholder: 'GitHub / Live URL',
    dashProjTagsPlaceholder: 'Vue, Node.js, Express',
    dashProjImagePlaceholder: 'https://images.unsplash.com/...',
    
    // Dashboard - Skills
    dashSkillsTitle: 'Skills Category Manager',
    dashSkillsSubtitle: 'Maintain your technical toolkit categories and progress ratings.',
    dashSkillsAddTitle: 'Add Skill',
    dashSkillsCatGroup: 'Category Group',
    dashSkillsName: 'Skill Name',
    dashSkillsLevel: 'Proficiency Level',
    dashSkillsAddBtn: 'Add Skill Tag',
    dashSkillsActiveTitle: 'Active Skills',
    dashBtnRemove: 'Remove',
    
    // Dashboard - Inbox
    dashInboxEmpty: 'No messages received yet.',
    dashInboxSender: 'From',
    dashInboxSubject: 'Subject',
    dashInboxDate: 'Date',
    dashInboxMsg: 'Message',
    dashInboxActions: 'Actions',
    dashInboxComposer: 'Email Composer',
    dashInboxSendReply: 'Send Reply (Mock)',
    dashInboxSubtitle: 'Review submission logs generated via the public contact forms.',
    dashInboxMarkUnread: 'Mark as Unread',
    dashInboxMarkRead: 'Mark as Read',
    dashInboxReply: 'Reply',
    dashInboxEmptyMsg: 'Your inbox is empty. Contact submissions will appear here!',
    dashInboxReplyTo: 'Reply to',
    dashInboxOriginal: 'Original Message:',
    dashInboxResponse: 'Your Response (Mock email dispatch)',
    dashInboxPlaceholderReply: 'Hi, thanks for reaching out...',
    dashInboxSending: 'Simulating SMTP Send...',
    dashInboxSendSuccess: 'Response successfully simulated!',
    dashInboxDeleteConfirm: 'Delete this message?',
    
    // Dashboard - Raw JSON
    dashRawSubtitle: 'Read and update your profile details using raw JSON. Export or copy-paste your database state directly.',
    dashRawApplyBtn: 'Validate & Apply Config',
    dashRawSuccessMsg: 'Verified & Saved!'
  },
  id: {
    // Navbar
    navHome: 'Beranda',
    navAbout: 'Tentang',
    navServices: 'Layanan',
    navProjects: 'Proyek',
    navContact: 'Kontak',
    navLogin: 'Masuk',
    
    // Hero
    heroGreeting: 'Halo, Saya',
    heroSubtitle: 'Saya membangun aplikasi berskala produksi yang tangguh dengan arsitektur bersih dan teknologi modern.',
    heroViewProjects: 'Lihat Portofolio',
    heroContactMe: 'Hubungi Saya',
    heroDownloadCV: 'Unduh CV',
    heroStatus: 'Tersedia untuk Freelance & Full-time',
    statExp: 'Tahun Pengalaman',
    statProj: 'Proyek Selesai',
    statTech: 'Pilar Teknologi',
    statCert: 'Sertifikasi',
    
    // About
    aboutSubtitle: 'Latar Belakang',
    aboutTitle: 'Tentang Saya & Kredensial',
    aboutTimeline: 'Linimasa Profesional',
    aboutEduCert: 'Pendidikan & Sertifikasi',
    aboutCert: 'Sertifikasi',
    aboutLangs: 'Bahasa',
    aboutMePart1: 'Tentang',
    aboutMePart2: 'Saya',
    aboutWhoIs: 'Siapa',
    aboutTechCap: 'Kemampuan Teknis',
    aboutTabExp: 'Pengalaman',
    aboutTabEdu: 'Pendidikan',
    aboutTabCreds: 'Kredensial',
    
    // Services
    servicesSubtitle: 'Layanan Kami',
    servicesTitle: 'Layanan & Keahlian',
    servicesIntro: 'Teknologi digital kustom yang dirancang untuk keandalan, skalabilitas, dan performa tinggi.',
    servicesTitlePart1: 'Layanan',
    servicesTitlePart2: 'Pilihan',
    serviceDetails: 'Detail',
    
    // Projects
    projectsSubtitle: 'Karya Terbaik',
    projectsTitle: 'Proyek Pilihan & Sistem',
    projectsIntro: 'Kumpulan platform logistik tingkat enterprise, sistem akuntabilitas kinerja pemerintah, dan aplikasi mobile berskala produksi untuk berbagai klien.',
    projectsCtaText: 'Ingin melihat struktur kode atau mendiskusikan desain arsitektur?',
    projectsCtaBtn: 'Lihat Lebih Banyak di GitHub',
    projectsFlagship: 'SISTEM ENTERPRISE UTAMA',
    catAll: 'Semua',
    projectsTitlePart1: 'Proyek',
    projectsTitlePart2: 'Pilihan & Sistem',
    
    // Contact
    contactSubtitle: 'Hubungi Kami',
    contactTitle: 'Mari Membangun Bersama',
    contactIntro: 'Punya ide proyek, ingin mendiskusikan arsitektur perangkat lunak, atau tertarik berkolaborasi? Kirim pesan dan mari kita bicarakan.',
    contactFormName: 'Nama Anda',
    contactFormEmail: 'Email Anda',
    contactFormSubject: 'Subjek',
    contactFormMessage: 'Pesan Anda',
    contactFormBtnSend: 'Kirim Pesan',
    contactFormBtnSending: 'Mengirim...',
    contactFormSuccess: 'Pesan berhasil dikirim! Saya akan segera menghubungi Anda.',
    contactMePart2: 'Saya',
    contactEmailMe: 'Kirim Email',
    contactCallWa: 'Telp / WA',
    contactFormError: 'Silakan isi semua bidang.',
    
    // Footer
    footerRights: 'Hak cipta dilindungi undang-undang.',
    
    // Splash
    splashLoading: 'Memuat aset digital...',
    splashCompiling: 'Membangun subsistem UI...',
    splashOptimizing: 'Mengoptimalkan kanvas rendering...',
    splashReady: 'Sistem Siap',
    
    // Login
    loginTitle: 'Akses Admin',
    loginSubtitle: 'Masukkan kredensial untuk mengakses kontroler portofolio',
    loginEmail: 'Alamat Email',
    loginPassword: 'Kata Sandi',
    loginBtn: 'Masuk ke Dashboard',
    loginError: 'Kredensial salah. Akses Ditolak.',
    loginTip: 'Tip: Gunakan darmah250903@gmail.com dan dary123',
    loginSigningIn: 'Masuk...',
    loginBack: 'Kembali ke Portofolio',
    
    // Dashboard
    dashTitle: 'Panel Kontrol Portofolio',
    dashBack: 'Kembali ke Situs',
    dashSaving: 'Menyimpan...',
    dashSaveSuccess: 'Perubahan berhasil disimpan!',
    dashStatsTitle: 'Analisis & Ikhtisar Aktivitas',
    dashStatsVisits: 'Kunjungan Sistem Bulanan',
    dashStatsTotalProjects: 'Total Proyek',
    dashStatsInboxCount: 'Pesan Masuk',
    dashTabsProfile: 'Edit Profil',
    dashTabsProjects: 'Kelola Proyek',
    dashTabsSkills: 'Kelola Keahlian',
    dashTabsInbox: 'Pesan Masuk',
    dashTabsRaw: 'JSON Basis Data Mentah',
    dashAdminControl: 'Kontrol Admin',
    dashTabsOverview: 'Ikhtisar',
    dashOverviewTitle: 'Status Ikhtisar',
    dashOverviewSubtitle: 'Metrik waktu nyata dari instansi portofolio lokal Anda.',
    dashStatsVisitsMock: 'Pengunjung Profil (Simulasi)',
    dashStatsUnread: 'Belum Dibaca',
    dashChartTitle: 'Grafik Aktivitas Pengunjung (Simulasi Mingguan)',
    dayMon: 'Sen',
    dayTue: 'Sel',
    dayWed: 'Rab',
    dayThu: 'Kam',
    dayFri: 'Jum',
    daySat: 'Sab',
    daySun: 'Min',
    
    // Dashboard - Profile
    dashProfileTitle: 'Informasi Pribadi',
    dashProfileLocation: 'Lokasi',
    dashProfileAddress: 'Alamat Lengkap',
    dashProfileBio: 'Deskripsi Bio',
    dashProfileAbout: 'Detail Tentang Saya',
    dashProfileEditTitle: 'Konteks Edit Profil',
    dashProfileEditSubtitle: 'Ubah bio dan informasi yang ditampilkan pada halaman utama.',
    dashProfileName: 'Nama',
    dashProfileJobTitle: 'Pekerjaan / Jabatan',
    dashProfileLinkedin: 'Tautan LinkedIn',
    dashProfileSaveBtn: 'Simpan Detail Profil',
    
    // Dashboard - Projects
    dashProjPanelTitle: 'Panel CRUD Proyek',
    dashProjPanelSubtitle: 'Tambah, edit, atau hapus entri dalam katalog portofolio.',
    dashProjAdd: 'Tambah Proyek Baru',
    dashProjEdit: 'Edit Proyek',
    dashProjTitle: 'Judul Proyek',
    dashProjDesc: 'Deskripsi',
    dashProjCat: 'Kategori',
    dashProjTags: 'Tag (pisahkan dengan koma)',
    dashProjImage: 'URL Gambar',
    dashProjLink: 'Tautan Proyek',
    dashProjFlagship: 'Proyek Unggulan',
    dashProjDeleteConfirm: 'Apakah Anda yakin ingin menghapus proyek ini?',
    dashProjActions: 'Aksi',
    dashProjUpdateBtn: 'Perbarui Proyek',
    dashProjAddBtn: 'Tambah Proyek',
    dashBtnCancel: 'Batal',
    dashProjActiveEntries: 'Entri Proyek Aktif',
    dashBtnEdit: 'Ubah',
    dashBtnDelete: 'Hapus',
    dashProjCatWeb: 'Aplikasi Web',
    dashProjCatMobile: 'Aplikasi Mobile',
    dashProjCatApi: 'Backend / API',
    dashProjTitlePlaceholder: 'misal: Pelacak Kurir',
    dashProjLinkPlaceholder: 'URL GitHub / Situs',
    dashProjTagsPlaceholder: 'Vue, Node.js, Express',
    dashProjImagePlaceholder: 'https://images.unsplash.com/...',
    
    // Dashboard - Skills
    dashSkillsTitle: 'Manajer Kategori Keahlian',
    dashSkillsSubtitle: 'Kelola kategori keahlian teknis dan tingkat kemahiran Anda.',
    dashSkillsAddTitle: 'Tambah Keahlian',
    dashSkillsCatGroup: 'Grup Kategori',
    dashSkillsName: 'Nama Keahlian',
    dashSkillsLevel: 'Tingkat Kemahiran',
    dashSkillsAddBtn: 'Tambah Tag Keahlian',
    dashSkillsActiveTitle: 'Keahlian Aktif',
    dashBtnRemove: 'Hapus',
    
    // Dashboard - Inbox
    dashInboxEmpty: 'Belum ada pesan masuk.',
    dashInboxSender: 'Pengirim',
    dashInboxSubject: 'Subjek',
    dashInboxDate: 'Tanggal',
    dashInboxMsg: 'Isi Pesan',
    dashInboxActions: 'Aksi',
    dashInboxComposer: 'Komposer Email',
    dashInboxSendReply: 'Kirim Balasan (Mock)',
    dashInboxSubtitle: 'Tinjau log pengiriman pesan dari formulir kontak publik.',
    dashInboxMarkUnread: 'Tandai Belum Dibaca',
    dashInboxMarkRead: 'Tandai Sudah Dibaca',
    dashInboxReply: 'Balas',
    dashInboxEmptyMsg: 'Kotak masuk Anda kosong. Pengiriman kontak akan muncul di sini!',
    dashInboxReplyTo: 'Balas ke',
    dashInboxOriginal: 'Pesan Asli:',
    dashInboxResponse: 'Tanggapan Anda (Simulasi pengiriman email)',
    dashInboxPlaceholderReply: 'Halo, terima kasih telah menghubungi...',
    dashInboxSending: 'Menyimulasikan Pengiriman SMTP...',
    dashInboxSendSuccess: 'Tanggapan berhasil disimulasikan!',
    dashInboxDeleteConfirm: 'Hapus pesan ini?',
    
    // Dashboard - Raw JSON
    dashRawSubtitle: 'Baca dan perbarui detail profil Anda menggunakan JSON mentah. Ekspor atau salin-tempel status basis data Anda secara langsung.',
    dashRawApplyBtn: 'Validasi & Terapkan Konfigurasi',
    dashRawSuccessMsg: 'Terverifikasi & Disimpan!'
  }
}

// Function to translate static UI elements
export function t(key) {
  const locale = currentLocale.value
  return staticTranslations[locale]?.[key] || staticTranslations['en']?.[key] || key
}

// Function to resolve bilingual property inside our localStorage database
export function val(obj, key) {
  if (!obj) return ''
  const locale = currentLocale.value
  
  // Look up key_en or key_id
  const localizedKey = `${key}_${locale}`
  if (obj[localizedKey] !== undefined && obj[localizedKey] !== '') {
    return obj[localizedKey]
  }
  
  // Fallback to key_en
  const enKey = `${key}_en`
  if (obj[enKey] !== undefined && obj[enKey] !== '') {
    return obj[enKey]
  }

  // Final fallback to original unlocalized key
  return obj[key] !== undefined ? obj[key] : ''
}

// Set active locale
export function setLocale(locale) {
  if (locale === 'en' || locale === 'id') {
    currentLocale.value = locale
    localStorage.setItem('locale', locale)
    document.documentElement.lang = locale
  }
}

// Set document lang attribute on load
document.documentElement.lang = currentLocale.value
