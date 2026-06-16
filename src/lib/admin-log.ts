import { supabaseAdmin } from '@/lib/supabase-admin';

export type LogAction =
  | 'product_create'
  | 'product_update'
  | 'product_delete'
  | 'bulk_upload';

export interface FieldChange {
  field: string;
  old: unknown;
  new: unknown;
}

export interface LogMeta {
  product_name?: string;
  brand?: string;
  category_id?: string;
  price?: number | null;
  stock?: number;
  changes?: FieldChange[];
  inserted?: number;
  updated?: number;
  skipped?: number;
  failed?: number;
  file_name?: string;
  total_rows?: number;
}

export async function writeLog(
  userId: string,
  action: LogAction,
  meta: LogMeta = {}
): Promise<void> {
  await supabaseAdmin.from('admin_logs').insert({
    user_id: userId,
    action,
    meta,
  });
  // Hata olsa da ana işlemi bloklamayalım — sessizce geç
}
