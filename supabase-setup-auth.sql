-- ============================================================
-- Admin Auth Kurulumu
-- Supabase Dashboard → SQL Editor'de çalıştır
-- ============================================================

-- 1. profiles tablosu
CREATE TABLE IF NOT EXISTS profiles (
  id   UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'editor' CHECK (role IN ('admin', 'editor')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Otomatik profil oluşturma: yeni kullanıcı kayıt olunca profiles'a ekle
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.profiles (id, role)
  VALUES (NEW.id, 'editor')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- RLS: profiles tablosunu yalnızca service_role okuyabilsin
-- (client tarafı login sayfasında anon key ile okumak gerekiyor,
--  bu yüzden authenticated kullanıcı kendi profilini okuyabilmeli)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Kullanici kendi profilini okuyabilir"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- ============================================================
-- 2. Admin kullanıcı oluşturma
-- Supabase Dashboard → Authentication → Users → "Add user" ile
-- kadirseverrr@hotmail.com adresini ve bir şifre belirle.
-- Kullanıcı oluştuktan sonra aşağıdaki sorguyu çalıştır
-- (ID'yi Dashboard'dan al):
-- ============================================================

-- INSERT INTO profiles (id, role)
-- VALUES ('<auth.users tablosundaki UUID>', 'admin')
-- ON CONFLICT (id) DO UPDATE SET role = 'admin';

-- VEYA: email ile bul ve güncelle
-- UPDATE profiles SET role = 'admin'
-- WHERE id = (SELECT id FROM auth.users WHERE email = 'kadirseverrr@hotmail.com');
