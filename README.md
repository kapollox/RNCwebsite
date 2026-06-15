# RNC Motor — Motosiklet Yedek Parça Kataloğu

Motosiklet yedek parça satış ve katalog sitesi. Müşteriler ürünleri kategorilere göre gezebilir ve WhatsApp üzerinden sipariş tamamlayabilir. Admin paneli üzerinden ürün kataloğu yönetilebilir.

**Canlı site:** [rn-cwebsite.vercel.app](https://rn-cwebsite.vercel.app)

---

## Teknoloji Stack

| Katman | Teknoloji |
|---|---|
| Framework | Next.js 16.2.9 (App Router) |
| Dil | TypeScript 5 |
| Stil | Tailwind CSS v4 |
| Veritabanı | Supabase (PostgreSQL + RLS) |
| Depolama | Supabase Storage (ürün görselleri) |
| 3D / Animasyon | React Three Fiber v9 + GSAP ScrollTrigger v3 |
| Deploy | Vercel |
| UI İkonlar | Lucide React |

---

## Özellikler

### Ana Sayfa — Scroll-Driven 3D Hero
- **Honda Shadow RS 2010 GLB modeli** — scroll ile dönen, 6 sinematik durum arasında geçiş yapan 3D motosiklet
- **Loading Screen** — Model yüklenene kadar siyah arka plan üzerinde RNC logosu + kırmızı progress bar
- **GSAP ScrollTrigger** — `scrub: 2.5` ile yavaş, sinematik geçişler; yan profilden ön görünüme akış
- **Scroll Sections** — 6 bölüm; her bölümde i18n destekli başlık, açıklama ve CTA butonları
- **Stat Bar** — 10+ yıl deneyim, 500+ parça, 7/24 destek

### Kullanıcı Tarafı
- **Kategori & Alt Kategori Kataloğu** — 19 ana kategori, 70+ alt kategori
- **Ürün Listeleme** — Her alt kategoride Supabase'den çekilen ürünler
- **Arama & Filtreleme** — İsim/açıklama araması, fiyat aralığı, stok durumu, sıralama
- **Ürün Detay Sayfası** — Görsel, fiyat, stok, uyumlu modeller, adet seçici, toast bildirimi
- **Sepet** — localStorage tabanlı, adet güncelleme, ürün silme, toplam hesaplama
- **Sipariş** — WhatsApp üzerinden otomatik sipariş mesajı oluşturma
- **Dil Desteği** — Türkçe / İngilizce tam i18n (tüm sayfalar)
- **Markalar Sayfası** — Honda, Yamaha, Suzuki, CFMoto, Mondial, Bajaj marka logoları
- **Responsive** — Mobil uyumlu tasarım

### Admin Paneli (`/admin`)
- Şifre ile korunan giriş
- Ürün listeleme, ekleme, düzenleme, silme (CRUD)
- Supabase Storage üzerinden görsel yükleme
- Tüm yazma işlemleri güvenli API route üzerinden geçer

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

Proje kökünde `.env.local` dosyası oluştur:

```env
NEXT_PUBLIC_SUPABASE_URL=https://<proje-id>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
NEXT_PUBLIC_ADMIN_PASSWORD=<admin-sifresi>
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>
```

> `SUPABASE_SERVICE_ROLE_KEY` yalnızca sunucu tarafında kullanılır, client bundle'a girmez.

### 4. Geliştirme sunucusunu başlat

```bash
npm run dev
```

Site `http://localhost:3000` adresinde çalışır.

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

**SCROLL_STATES akışı:**
| # | ID | Görünüm |
|---|---|---|
| 0 | hero | Sol yan profil — tüm silüet |
| 1 | threequarter | 3/4 ön-sol |
| 2 | closeup | Yakın çekim, ön-sol detay |
| 3 | front | Tam karşıdan |
| 4 | diagonal | Hafif sağ-çapraz |
| 5 | final | Tam ön, merkezi kapanış |

---

## Supabase Kurulumu

### Tablo Oluşturma

Supabase SQL Editor'da aşağıdaki sorguyu çalıştır:

```sql
CREATE TABLE products (
  id                UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name_tr           TEXT NOT NULL,
  name_en           TEXT NOT NULL,
  slug              TEXT NOT NULL UNIQUE,
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
```

### RLS Politikaları

```sql
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Ziyaretçiler sadece aktif ürünleri okuyabilir
CREATE POLICY "Public can read active products"
  ON products FOR SELECT TO anon
  USING (is_active = true);

-- Yazma işlemleri yalnızca service_role ile
CREATE POLICY "Authenticated can insert products"
  ON products FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated can update products"
  ON products FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated can delete products"
  ON products FOR DELETE TO authenticated USING (true);
```

### Storage Bucket

1. Supabase Dashboard → **Storage** → **New bucket**
2. Bucket adı: `product-images`
3. Public erişim: **açık**
4. Anon kullanıcılara okuma izni ver

---

## Admin Paneli

### Giriş

`/admin/login` adresine git. `.env.local`'daki `NEXT_PUBLIC_ADMIN_PASSWORD` değerini gir.

### Ürün Yönetimi

| İşlem | URL |
|---|---|
| Ürün listesi | `/admin` |
| Yeni ürün ekle | `/admin/urun-ekle` |
| Ürün düzenle | `/admin/urun/[id]` |

### Güvenlik Mimarisi

```
Tarayıcı (Admin Paneli)
  → /api/admin/products  (x-admin-token header ile)
      → Server-side API Route
          → Supabase (service_role key ile)
```

- `service_role` key yalnızca sunucu tarafında tutulur, tarayıcıya hiç gitmez
- Her istekte `x-admin-token` header kontrol edilir; eşleşmezse `401 Unauthorized` döner
- RLS politikaları anonim yazma/silmeyi engeller

---

## Deploy (Vercel)

### 1. Vercel CLI ile bağla

```bash
npm install -g vercel
vercel login
vercel link
```

### 2. Environment Variables

Vercel Dashboard → **Settings** → **Environment Variables** bölümüne şu değerleri ekle:

| Değişken | Açıklama |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase proje URL'i |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon (public) key |
| `NEXT_PUBLIC_ADMIN_PASSWORD` | Admin giriş şifresi |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (gizli) |

### 3. Production Deploy

```bash
vercel --prod
```

---

## Güvenlik Notları

- **Service Role Key** asla `NEXT_PUBLIC_` prefix'i ile tanımlanmamalıdır — client bundle'a sızmaz
- **Admin şifresi** şu an `NEXT_PUBLIC_` ile tanımlı; bu şifre build sırasında JS bundle'a girer. Güçlü ve tahmin edilemez bir şifre kullan; ileride Supabase Auth ile değiştirilmesi önerilir
- **RLS** açık; anonim kullanıcılar yalnızca `is_active = true` ürünleri okuyabilir, yazamaz
- **API route token** kontrolü stateless'tır — ileride Supabase Auth session ile güçlendirilebilir

---

## Gelecek Planlar / TODO

- [ ] Supabase Auth ile gerçek admin kimlik doğrulaması
- [ ] Ürün detay sayfasını Server Component'e geçirme (SEO için)
- [ ] Sitemap ve meta tag optimizasyonu
- [ ] Çoklu görsel desteği (ürün başına galeri)
- [ ] Stok azaldığında admin e-posta bildirimi
- [ ] Ürün karşılaştırma özelliği
- [ ] Teklif formu (WhatsApp'a ek olarak e-posta)
- [ ] Supabase Storage görsel optimizasyonu (WebP dönüşümü)
