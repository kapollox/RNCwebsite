import { createClient } from '@supabase/supabase-js';

// Service role key varsa kullan (yazma/silme işlemleri için RLS bypass),
// yoksa anon key ile devam et (JWT doğrulama ve okuma işlemleri için yeterli).
const key =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  key
);
