# Forum SAINTEK - Front End

Forum SAINTEK adalah aplikasi berbasis web yang memungkinkan pengguna untuk berbagi informasi, berdiskusi, dan berinteraksi dalam berbagai kategori sains dan teknologi. Aplikasi ini dibangun menggunakan React dan terhubung dengan Express JS Back-End melalui REST API.

## Fitur Utama

- **Autentikasi Pengguna**: Registrasi, Login, dan Logout.
- **Manajemen Thread**: Membuat, melihat daftar thread, dan melihat detail thread.
- **Subforum**: Menjelajahi thread berdasarkan kategori atau subforum tertentu.
- **Sistem Komentar**: Berinteraksi dalam diskusi melalui komentar.
- **Sistem Voting**: Memberikan dukungan atau ketidaksetujuan pada thread (Upvote/Downvote).
- **Responsif**: Desain yang dioptimalkan untuk berbagai ukuran layar menggunakan Tailwind CSS.

## Teknologi yang Digunakan

- **Framework**: [React](https://reactjs.org/) dengan [Vite](https://vitejs.dev/)
- **Routing**: [React Router Dom](https://reactrouter.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **HTTP Client**: [Axios](https://axios-http.com/)

## Persiapan Awal

### Prasyarat
- Node.js (versi terbaru direkomendasikan)
- npm atau yarn

### Instalasi
1. Clone repository ini:
   ```bash
   git clone <repository-url>
   ```
2. Masuk ke direktori proyek:
   ```bash
   cd forum-saintek
   ```
3. Instal dependensi:
   ```bash
   npm install
   ```

### Konfigurasi Environment
Buat file `.env` di direktori akar dan tambahkan URL base API backend Anda:
```env
VITE_API_BASE_URL=http://your-backend-api-url/api
```

## Menjalankan Aplikasi

- **Mode Pengembangan**:
  ```bash
  npm run dev
  ```
  Aplikasi akan berjalan di `http://localhost:5173`.

- **Membangun untuk Produksi**:
  ```bash
  npm run build
  ```

- **Linting**:
  ```bash
  npm run lint
  ```

## Struktur Folder

- `src/components`: Komponen UI yang dapat digunakan kembali seperti Navbar, Card, dan Button.
- `src/pages`: Komponen halaman utama aplikasi (Home, Login, Register, Detail, dll).
- `src/services`: Konfigurasi API dan Axios instance.
- `src/store`: Pengelolaan state global menggunakan Zustand (seperti auth store).

## Lisensi
Proyek ini dikembangkan untuk tujuan edukasi dan pengembangan komunitas SAINTEK.
