# 🖼️ Cara Mengintegrasikan Gambar Business Card ke Website

Setelah Anda mendapatkan gambar business card dari AI generator, ikuti langkah berikut:

## 📥 Langkah 1: Simpan Gambar

1. Simpan gambar dengan nama: `business-card-stack.png` atau `business-card-stack.webp`
2. Letakkan di folder root project (folder yang sama dengan `index.html`)

## 🔄 Langkah 2: Aktifkan Gambar di HTML

Buka file `index.html` dan cari bagian Loading Screen (sekitar baris 23-40).

**Ubah dari:**
```html
<!-- Option 2: CSS Styled Card (currently active) -->
<div class="business-card">
    ...
</div>
```

**Menjadi:**
```html
<!-- Option 1: Use Image (uncomment when you have the image) -->
<div class="business-card-image-container">
    <img src="business-card-stack.png" alt="Business Card" class="business-card-image">
</div>

<!-- Option 2: CSS Styled Card (currently active) -->
<!-- 
<div class="business-card">
    ...
</div>
-->
```

Atau lebih mudah, **uncomment** bagian image dan **comment** bagian CSS card.

## 🎨 Langkah 3: Optimasi Gambar (Penting!)

Untuk performa website yang baik:

1. **Kompres Gambar:**
   - Gunakan [TinyPNG](https://tinypng.com) atau [Squoosh](https://squoosh.app)
   - Target: < 500KB
   - Format: PNG (dengan transparansi) atau WebP (lebih kecil)

2. **Resize jika perlu:**
   - Ukuran optimal: 1200-1920px lebar
   - Jangan terlalu besar (akan memperlambat loading)

## ✅ Langkah 4: Test

1. Buka `index.html` di browser
2. Cek apakah gambar muncul dengan benar
3. Test di berbagai ukuran layar (mobile, tablet, desktop)
4. Pastikan animasi berjalan smooth

## 🔧 Troubleshooting

### Gambar Tidak Muncul
- ✅ Pastikan nama file sesuai dengan path di HTML
- ✅ Pastikan file ada di folder yang sama dengan `index.html`
- ✅ Cek console browser (F12) untuk error

### Gambar Terlalu Besar/Kecil
- Edit CSS di `styles.css`:
  ```css
  .business-card-image {
      width: 100%;
      max-width: 600px; /* Ubah sesuai kebutuhan */
  }
  ```

### Animasi Tidak Smooth
- Pastikan file gambar tidak terlalu besar (< 500KB)
- Gunakan format WebP untuk file size lebih kecil

## 🎯 Alternatif: Gunakan CSS Version

Jika gambar tidak sesuai atau loading terlalu lama, Anda bisa tetap menggunakan versi CSS yang sudah diupdate dengan desain hijau-hitam diagonal. Versi CSS ini:
- ✅ Loading lebih cepat
- ✅ Responsif sempurna
- ✅ Desain sesuai spesifikasi (hijau gradient + hitam)
- ✅ Animasi smooth

Tinggal biarkan bagian CSS card aktif dan comment bagian image.

## 📝 Catatan

- Gambar akan otomatis responsive (menyesuaikan ukuran layar)
- Animasi float sudah disiapkan di CSS
- Background transparan akan otomatis terlihat di loading screen

