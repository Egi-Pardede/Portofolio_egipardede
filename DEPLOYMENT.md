# 🚀 Panduan Deployment Portfolio Website

Panduan lengkap untuk mendeploy website portfolio Anda ke internet secara gratis.

## 📋 Daftar Isi

1. [GitHub Pages](#1-github-pages-rekomendasi)
2. [Netlify](#2-netlify)
3. [Vercel](#3-vercel)
4. [Cloudflare Pages](#4-cloudflare-pages)

---

## 1. GitHub Pages (Rekomendasi)

**Keuntungan:**
- ✅ Gratis selamanya
- ✅ Terintegrasi dengan GitHub
- ✅ Mudah digunakan
- ✅ Mendukung custom domain

### Langkah-langkah:

#### A. Persiapan Repository GitHub

1. **Buat Repository di GitHub:**
   - Buka [github.com](https://github.com) dan login
   - Klik tombol **"+"** di pojok kanan atas → **"New repository"**
   - Nama repository:
     - **Opsi 1 (Domain utama)**: `username.github.io` (contoh: `egipardede.github.io`)
       - Website akan tersedia di: `https://username.github.io`
     - **Opsi 2 (Subfolder)**: Nama bebas (contoh: `portfolio`)
       - Website akan tersedia di: `https://username.github.io/portfolio`
   - Pilih **Public** (gratis)
   - **JANGAN** centang README, .gitignore, atau license
   - Klik **"Create repository"**

2. **Upload File ke GitHub:**

   **Cara 1: Menggunakan Git Command Line**
   ```bash
   # Buka terminal/command prompt di folder project Anda
   cd C:\Portofolio_egipardede\Portofolio_egipardede
   
   # Inisialisasi Git (jika belum)
   git init
   
   # Tambahkan semua file
   git add .
   
   # Commit
   git commit -m "Initial commit: Portfolio website"
   
   # Tambahkan remote repository (ganti dengan URL repository Anda)
   git remote add origin https://github.com/USERNAME/REPOSITORY-NAME.git
   
   # Push ke GitHub
   git branch -M main
   git push -u origin main
   ```

   **Cara 2: Menggunakan GitHub Web Interface**
   - Di halaman repository baru, klik **"uploading an existing file"**
   - Drag & drop semua file (`index.html`, `styles.css`, `script.js`, dll)
   - Klik **"Commit changes"**

#### B. Aktifkan GitHub Pages

1. Di repository GitHub, klik tab **"Settings"**
2. Scroll ke bagian **"Pages"** di sidebar kiri
3. Di bagian **"Source"**:
   - **Branch**: Pilih `main` (atau `master`)
   - **Folder**: Pilih `/ (root)`
4. Klik **"Save"**

#### C. Akses Website

- Tunggu 1-10 menit untuk GitHub memproses
- Website akan tersedia di:
  - `https://username.github.io` (jika repo bernama `username.github.io`)
  - `https://username.github.io/repository-name` (jika nama repo berbeda)

---

## 2. Netlify

**Keuntungan:**
- ✅ Gratis dengan fitur lengkap
- ✅ Deploy otomatis dari GitHub
- ✅ SSL otomatis
- ✅ Custom domain mudah

### Langkah-langkah:

1. **Buka [netlify.com](https://netlify.com)** dan daftar/login (bisa pakai akun GitHub)

2. **Deploy Website:**
   - Klik **"Add new site"** → **"Deploy manually"**
   - Drag & drop folder project Anda ke area upload
   - Netlify akan otomatis deploy website Anda
   - Website akan tersedia di URL seperti: `https://random-name-123.netlify.app`

3. **Custom Domain (Opsional):**
   - Di dashboard Netlify, klik **"Domain settings"**
   - Tambahkan domain custom Anda
   - Ikuti instruksi untuk setup DNS

4. **Auto Deploy dari GitHub (Opsional):**
   - Klik **"Add new site"** → **"Import an existing project"**
   - Pilih repository GitHub Anda
   - Netlify akan otomatis deploy setiap kali Anda push ke GitHub

---

## 3. Vercel

**Keuntungan:**
- ✅ Gratis dengan performa cepat
- ✅ Deploy otomatis dari GitHub
- ✅ SSL otomatis
- ✅ CDN global

### Langkah-langkah:

1. **Buka [vercel.com](https://vercel.com)** dan daftar/login (bisa pakai akun GitHub)

2. **Deploy Website:**
   - Klik **"Add New Project"**
   - Import repository GitHub Anda, atau
   - Klik **"Deploy"** dan drag & drop folder project
   - Vercel akan otomatis detect dan deploy
   - Website akan tersedia di URL seperti: `https://project-name.vercel.app`

3. **Custom Domain:**
   - Di project settings, klik **"Domains"**
   - Tambahkan domain custom Anda

---

## 4. Cloudflare Pages

**Keuntungan:**
- ✅ Gratis tanpa batas
- ✅ CDN global super cepat
- ✅ Deploy otomatis dari GitHub
- ✅ SSL otomatis

### Langkah-langkah:

1. **Buka [pages.cloudflare.com](https://pages.cloudflare.com)** dan daftar/login

2. **Deploy Website:**
   - Klik **"Create a project"**
   - Pilih **"Upload assets"** untuk upload manual, atau
   - Connect dengan GitHub untuk auto-deploy
   - Website akan tersedia di URL seperti: `https://project-name.pages.dev`

3. **Custom Domain:**
   - Di project settings, tambahkan custom domain
   - Cloudflare akan handle DNS secara otomatis

---

## 🔧 Troubleshooting

### Website Tidak Muncul (404 Error)

**GitHub Pages:**
- Tunggu 5-10 menit (GitHub perlu waktu build)
- Pastikan branch yang dipilih di Settings > Pages adalah `main`
- Pastikan folder source adalah `/ (root)`
- Clear cache browser (Ctrl+F5)

**Netlify/Vercel/Cloudflare:**
- Cek log deployment di dashboard
- Pastikan file `index.html` ada di root folder
- Pastikan tidak ada error di console browser

### CSS/JavaScript Tidak Berfungsi

- Pastikan path file benar (relatif, bukan absolut)
- Contoh: `<link rel="stylesheet" href="styles.css">` ✅
- Bukan: `<link rel="stylesheet" href="/styles.css">` ❌ (jika di subfolder)

### Gambar Tidak Muncul

- Website ini menggunakan gambar dari Unsplash (CDN)
- Pastikan koneksi internet aktif
- Atau ganti dengan URL gambar Anda sendiri

---

## 📝 Update Website Setelah Deploy

### GitHub Pages:
```bash
# Edit file lokal
# Lalu commit dan push
git add .
git commit -m "Update portfolio"
git push
```

### Netlify/Vercel/Cloudflare:
- Jika sudah connect dengan GitHub: Otomatis update saat push
- Jika manual upload: Upload ulang folder yang sudah diupdate

---

## 🌐 Custom Domain

Semua platform di atas mendukung custom domain gratis:

1. **Beli domain** di:
   - [Namecheap](https://namecheap.com)
   - [GoDaddy](https://godaddy.com)
   - [Cloudflare Registrar](https://www.cloudflare.com/products/registrar/)

2. **Setup DNS:**
   - Ikuti instruksi di masing-masing platform
   - Biasanya perlu menambahkan CNAME atau A record

3. **Tunggu propagasi DNS** (bisa 1-48 jam)

---

## ✅ Checklist Sebelum Deploy

- [ ] Semua file penting ada (index.html, styles.css, script.js)
- [ ] Test website di browser lokal
- [ ] Pastikan semua link berfungsi
- [ ] Update informasi kontak di website
- [ ] Update link social media (jika ada)
- [ ] Test di berbagai ukuran layar (mobile, tablet, desktop)

---

## 🎉 Selesai!

Setelah deploy, website portfolio Anda akan online dan bisa diakses siapa saja!

**Tips:**
- Simpan URL website Anda untuk dibagikan
- Update link portfolio di CV/resume Anda
- Share di LinkedIn dan media sosial lainnya

---

**Pertanyaan?** Cek dokumentasi resmi masing-masing platform atau buka issue di repository GitHub Anda.

