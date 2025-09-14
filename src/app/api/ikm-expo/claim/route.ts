import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const CAMPAIGN_DEADLINE = new Date('2025-09-19T16:59:59Z'); // 23:59 WIB

export async function POST(request: Request) {
    // Get Supabase session from cookies
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (!session || sessionError) {
        return NextResponse.json({ success: false, reason: 'unauthenticated' }, { status: 401 });
    }

    // Deadline check
    const now = new Date();
    if (now >= CAMPAIGN_DEADLINE) {
        return NextResponse.json({ success: false, reason: 'expired' }, { status: 403 });
    }

    // Idempotent update
    const { error } = await supabase
        .from('users')
        .update({ isFromIKMExpo: true })
        .eq('id', session.user.id);
    if (error) {
        return NextResponse.json({ success: false, reason: 'db_error', details: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
}
