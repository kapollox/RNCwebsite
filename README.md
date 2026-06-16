# RNC Motor — Motosiklet Yedek Parça Kataloğu

Motosiklet yedek parça katalog ve satış sitesi. Müşteriler ürünleri kategorilere göre gezebilir, WhatsApp üzerinden sipariş tamamlayabilir. Admin paneli üzerinden tüm ürün kataloğu yönetilebilir.

**Canlı site:** [rn-cwebsite.vercel.app](https://rn-cwebsite.vercel.app)
**GitHub:** [kapollox/RNCwebsite](https://github.com/kapollox/RNCwebsite)

---

## Teknoloji Stack

| Katman | Teknoloji |
|---|---|
| Framework | Next.js 16.2.9 (App Router) |
| Dil | TypeScript 5 |
| Stil | Tailwind CSS v4 |
| Veritabanı | Supabase (PostgreSQL + RLS) |
| Auth | Supabase Auth (JWT tabanlı, `profiles` tablosu ile rol yönetimi) |
| Depolama | Supabase Storage (ürün görselleri) |
| 3D / Animasyon | React Three Fiber v9 + GSAP ScrollTrigger v3 |
| Deploy | Vercel |
| UI İkonlar | Lucide React |
| Excel İşleme | SheetJS (xlsx) |

---

## Özellikler

### Ana Sayfa — Scroll-Driven 3D Hero
- **Honda Shadow RS 2010 GLB modeli** — scroll ile dönen, 6 sinematik durum arasında geçiş yapan 3D motosiklet
- **Loading Screen** — Model yüklenene kadar siyah arka plan üzerinde RNC logosu + kırmızı progress bar
- **GSAP ScrollTrigger** — `scrub: 2.5` ile yavaş, sinematik geçişler
- **Scroll Sections** — 6 bölüm; her bölümde i18n destekli başlık, açıklama ve CTA butonları
- **Stat Bar** — 10+ yıl deneyim, 500+ parça, 7/24 destek
- **WhyRNC** — 4 maddelik avantaj bölümü (i18n bağlı)
- **Öne Çıkan Ürünler** — Supabase'den çekilen ürünler, WhatsApp sipariş butonu

### Kullanıcı Tarafı
- **Kategori & Alt Kategori Kataloğu** — 19 ana kategori, 70+ alt kategori
- **Ürün Listeleme** — Her alt kategoride Supabase'den çekilen ürünler, sayfalama
- **Arama & Filtreleme** — İsim/açıklama araması, fiyat aralığı, stok durumu, sıralama
- **Ürün Detay Sayfası** — Görsel, fiyat, stok, uyumlu modeller, adet seçici, toast bildirimi
- **Harici Görsel URL Desteği** — `image_url` alanına herhangi bir `http/https` URL yazılabilir; Next.js wildcard `remotePatterns` ile tüm domainler kabul edilir
- **Sepet** — localStorage tabanlı, adet güncelleme, ürün silme, toplam hesaplama
- **Sipariş** — WhatsApp üzerinden otomatik sipariş mesajı oluşturma
- **Dil Desteği** — Türkçe / İngilizce tam i18n (tüm sayfalar, `src/lib/i18n.ts`)
- **Markalar Sayfası** — Honda, Yamaha, Suzuki, CFMoto, Mondial, Bajaj marka logoları
- **Yasal Sayfalar** — Gizlilik Politikası, Kullanım Şartları, İade Koşulları
- **404 Sayfası** — Marka uyumlu özel not-found sayfası
- **robots.txt** — `/admin` ve `/api` dizinleri tarama dışı

### Admin Paneli (`/admin`)

Supabase Auth JWT tabanlı kimlik doğrulama. `profiles` tablosunda `role: 'admin' | 'editor'` ile yetki kontrolü.

#### Ürün Yönetimi
- Ürün listeleme, ekleme, düzenleme, silme (CRUD)
- **Marka filtresi** — RKS Motor, Kuba Motor, Mondial, Arora, Yuki ve diğerleri
- **Arama kutusu** — ürün adı, marka, kategori veya alt kategoriye göre anlık filtreleme
- **Checkbox seçim** — tekil veya tümünü seç, seçili ürünleri toplu sil
- Supabase Storage üzerinden görsel yükleme

#### Toplu Yükleme (`/admin/toplu-yukle`)
- Excel (.xlsx) veya CSV dosyasından toplu ürün ekleme
- **Akıllı marka normalizasyonu** — `rks123`, `rksmotor`, `RKSMotors` gibi yazımları otomatik "RKS Motor"a çevirir; diğer markalar için de alias desteği
- Önizleme tablosu — yüklemeden önce geçerli/hatalı satırları gösterir; düzeltilen marka adları "düzeltildi" etiketiyle vurgulanır
- **Duplicate modu** — aynı isimli ürün varsa: Atla / Güncelle / Hata Ver
- Şablon Excel indirme

#### Kategori Yönetimi (`/admin/kategoriler`)
- Ana kategori ve alt kategori oluşturma, düzenleme, silme

#### İşlem Logları (`/admin/loglar`)
Yapılan her işlem otomatik olarak `admin_logs` tablosuna kaydedilir.

Kayıt altına alınan işlemler:
- **Ürün ekleme** — ürün adı, marka, kategori, fiyat, stok
- **Ürün güncelleme** — hangi alanın ne'den ne'ye değiştiği (alan diff: eski → yeni)
- **Ürün silme** — silinen ürünün adı ve markası
- **Toplu yükleme** — eklenen / güncellenen / atlanan / başarısız sayıları

Log yönetimi: tekil seçim, çoklu seçim veya tüm logları silme.

---

## Kurulum (Lokal)

### 1. Repoyu klonla

```bash
git clone https://github.com/kapollox/RNCwebsite.git
cd website
```

### 2. Bağımlılıkları yükle

```bash
npm install
```

### 3. `.env.local` dosyasını oluştur

```env
NEXT_PUBLIC_SUPABASE_URL=https://<proje-id>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>
```

> `SUPABASE_SERVICE_ROLE_KEY` yalnızca sunucu tarafında kullanılır, client bundle'a girmez.  
> `NEXT_PUBLIC_ADMIN_PASSWORD` artık kullanılmıyor — kimlik doğrulama Supabase Auth ile yapılıyor.

### 4. Geliştirme sunucusunu başlat

```bash
npm run dev
```

Site `http://localhost:3000` adresinde çalışır.

---

## Supabase Kurulumu

### Tablolar

```sql
-- Ürünler
CREATE TABLE products (
  id                UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name_tr           TEXT NOT NULL,
  name_en           TEXT NOT NULL,
  slug              TEXT NOT NULL UNIQUE,
  brand             TEXT,
  category_id       TEXT NOT NULL,
  subcategory_id    TEXT,
  price             NUMERIC(10,2),
  stock             INTEGER DEFAULT 0,
  description_tr    TEXT,
  description_en    TEXT,
  image_url         TEXT,
  compatible_models TEXT[],
  is_active         BOOLEAN DEFAULT true,
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_products_category    ON products(category_id);
CREATE INDEX idx_products_subcategory ON products(subcategory_id);
CREATE INDEX idx_products_slug        ON products(slug);
CREATE INDEX idx_products_active      ON products(is_active);

-- Kategoriler
CREATE TABLE categories (
  id       TEXT PRIMARY KEY,
  name_tr  TEXT NOT NULL,
  name_en  TEXT NOT NULL,
  slug     TEXT NOT NULL UNIQUE
);

-- Alt Kategoriler
CREATE TABLE subcategories (
  id          TEXT PRIMARY KEY,
  name_tr     TEXT NOT NULL,
  name_en     TEXT NOT NULL,
  slug        TEXT NOT NULL,
  category_id TEXT NOT NULL REFERENCES categories(id) ON DELETE CASCADE
);

-- Kullanıcı rolleri
CREATE TABLE profiles (
  id    UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  role  TEXT DEFAULT 'editor' CHECK (role IN ('admin', 'editor'))
);

-- İşlem logları
CREATE TABLE admin_logs (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id    UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  action     TEXT NOT NULL,
  meta       JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX admin_logs_created_at_idx ON admin_logs(created_at DESC);
```

### RLS Politikaları

```sql
-- Products: herkese okuma, service_role'e yazma
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read active" ON products FOR SELECT TO anon USING (is_active = true);
CREATE POLICY "Service role bypass" ON products FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Profiles: service_role tam erişim
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role bypass" ON profiles FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Admin logs: authenticated okuma, service_role tam erişim
ALTER TABLE admin_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Adminler okuyabilir" ON admin_logs FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('admin', 'editor')));
CREATE POLICY "Service role bypass" ON admin_logs FOR ALL TO service_role USING (true) WITH CHECK (true);
```

### Storage Bucket

1. Supabase Dashboard → **Storage** → **New bucket**
2. Bucket adı: `product-images`
3. Public erişim: **açık**

---

## 3D Hero Mimarisi

```
HeroExperience (orchestrator)
  ├── LoadingScreen       — GLB yüklenene kadar logo + progress bar
  ├── TireScene (R3F)     — Canvas, BikeModel, SceneLights
  │     └── BikeModel     — useFrame ile proxy'den lerp damping
  ├── ScrollSections      — i18n destekli metin overlay
  └── GSAP ScrollTrigger  — proxyRef üzerinden 6 state arası tween
```

**Proxy Pattern:** GSAP bir JS nesnesini (`proxyRef`) tween'ler; R3F `useFrame` her karede bu nesneyi okur. İki animasyon sistemi çakışmaz.

| # | ID | Görünüm |
|---|---|---|
| 0 | hero | Sol yan profil |
| 1 | threequarter | 3/4 ön-sol |
| 2 | closeup | Yakın çekim |
| 3 | front | Tam karşıdan |
| 4 | diagonal | Hafif sağ-çapraz |
| 5 | final | Tam ön, kapanış |

---

## Güvenlik Mimarisi

```
Tarayıcı (Admin Paneli)
  → /api/admin/*  (Authorization: Bearer <supabase-jwt>)
      → requireAdmin() — supabaseAdmin.auth.getUser(token)
          → profiles tablosundan role kontrolü
              → Supabase (service_role key ile)
```

- `service_role` key yalnızca sunucu tarafında tutulur
- Her API route'da `requireAdmin()` ile JWT doğrulaması yapılır
- `requireAdminRole()` ile sadece `admin` rolüne kısıtlanabilen işlemler ayrılmış
- RLS politikaları anonim yazma/silmeyi engeller

---

## Deploy (Vercel)

Vercel Dashboard → **Settings** → **Environment Variables**:

| Değişken | Açıklama |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase proje URL'i |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon (public) key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (gizli) |

> **Önemli:** `SUPABASE_SERVICE_ROLE_KEY` değerini Vercel'e girerken kopyala/yapıştır ile BOM karakteri (U+FEFF) girebilir. Bu durumda key `﻿eyJ...` şeklinde görünür ve tüm sunucu tarafı işlemler başarısız olur. Değeri elle yeniden yazarak girin.

---

## Gelecek Planlar / TODO

- [ ] Ürün detay sayfasını Server Component'e geçirme (SEO)
- [ ] Sitemap ve meta tag optimizasyonu
- [ ] Çoklu görsel desteği (ürün başına galeri)
- [ ] Stok azaldığında admin e-posta bildirimi
- [ ] Ürün karşılaştırma özelliği
- [ ] Teklif formu (WhatsApp'a ek olarak e-posta)
- [ ] Supabase Storage görsel optimizasyonu (WebP dönüşümü)
- [ ] Admin log sayfasında aksiyon ve tarih bazlı filtreleme
