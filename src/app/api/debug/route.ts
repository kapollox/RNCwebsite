import { NextResponse } from 'next/server';

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const svc = process.env.SUPABASE_SERVICE_ROLE_KEY;

  return NextResponse.json({
    url_set: !!url,
    url_prefix: url?.substring(0, 30),
    anon_set: !!anon,
    anon_prefix: anon?.substring(0, 20),
    service_key_set: !!svc,
    service_key_length: svc?.length ?? 0,
    service_key_prefix: svc?.substring(0, 20),
  });
}
