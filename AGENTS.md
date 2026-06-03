# Forum SAINTEK - Front End AI Agent Guidelines

Dokumen ini adalah panduan utama bagi AI Agent (Jules) untuk membangun komponen dan fitur front-end Forum SAINTEK. Front-end ini terhubung dengan Express JS Back-End menggunakan REST API.

## 1. Tech Stack & Aturan Coding
- Framework: React (v18 atau v19) dengan Vite
- Routing: React Router Dom v6 (Client-side routing untuk SPA)
- Styling: Tailwind CSS (Pendekatan utility-first yang bersih)
- State Management: Zustand (Untuk menyimpan token autentikasi dan sesi user)
- HTTP Client: Axios (Gunakan instance axios khusus untuk menyertakan token otomatis)

## 2. Manajemen Environment Variables
- Gunakan variabel `VITE_API_BASE_URL` untuk menyimpan alamat base URL backend.
- Jangan melakukan hardcode URL API di dalam kode komponen.

## 3. Struktur Folder yang Diwajibkan
Jules harus mematuhi struktur folder berikut saat membuat file baru:
- `/src/components` : Komponen UI yang dapat digunakan kembali (Navbar, Card Thread, Button, CommentSection).
- `/src/pages` : Komponen Halaman Utama (Home.jsx, Login.jsx, Register.jsx, ThreadDetail.jsx, SubforumDetail.jsx).
- `/src/store` : State management Zustand (`authStore.js` untuk menyimpan session/token).
- `/src/services` : Konfigurasi Axios instance dan fungsi pemanggilan API (`api.js`).

## 4. Struktur Routing (Halaman) yang Harus Dibuat
Jules harus menyiapkan rute berikut menggunakan React Router Dom:
- `/` : Menampilkan halaman utama dengan daftar semua thread.
- `/login` : Menampilkan form login.
- `/register` : Menampilkan form registrasi user baru.
- `/subforums/:slug` : Menampilkan daftar thread berdasarkan subforum/kategori tertentu.
- `/threads/:id` : Menampilkan detail lengkap suatu thread beserta komentar di bawahnya.

## 5. Pemetaan REST API Backend (Referensi untuk Jules)
Semua request ditujukan ke: `VITE_API_BASE_URL`

### Autentikasi & Users
- `POST /api/users` : Registrasi user baru.
- `GET /api/users/me` : Mendapatkan profil user yang sedang login (Butuh Bearer Token).
- `POST /api/authentications` : Login user (Mengembalikan Access Token).
- `DELETE /api/authentications` : Logout user.

### Threads (Postingan Forum)
- `GET /api/threads` : Mendapatkan semua daftar thread.
- `POST /api/threads` : Membuat thread baru (Butuh Bearer Token).
- `GET /api/threads/{id}` : Mendapatkan detail spesifik suatu thread.
- `DELETE /api/threads/{id}` : Menghapus thread (Hanya pemilik/admin).

### Subforums (Kategori)
- `GET /api/subforums` : Mendapatkan daftar semua subforum.
- `GET /api/subforums/{slug}` : Mendapatkan detail subforum berdasarkan slug.

### Comments & Votes
- `GET /api/comments/thread/{threadId}` : Mengambil semua komentar di dalam thread tertentu.
- `POST /api/comments` : Membuat komentar baru atau membalas komentar lain.
- `POST /api/votes` : Sistem voting (Upvote/Downvote) toggle.

## 6. Standar Keamanan & Autentikasi
- Simpan Access Token di dalam store Zustand setelah login berhasil.
- Setiap request ke endpoint yang membutuhkan autentikasi harus menyertakan header: `Authorization: Bearer <token>`. Gunakan Axios Interceptor untuk menyisipkan header ini secara otomatis jika token tersedia di Zustand store.
