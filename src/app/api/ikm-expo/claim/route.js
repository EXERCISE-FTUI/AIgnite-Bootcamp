import { NextResponse } from "next/server"; 
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"; 
import { cookies } from "next/headers"; 

export async function POST(request) { 
  // Use Supabase client to get user from request cookies 
  const supabase = createRouteHandlerClient({ cookies: () => cookies() }); 
    const { 
      data: { user }, 
      error: userError, 
    } = await supabase.auth.getUser(); 
    console.log('Session fetch result:', { user, userError }); 

    if (!user || userError) { 
      return new Response( 
        JSON.stringify({ success: false, reason: "unauthenticated" }), 
        { status: 401, headers: { "Content-Type": "application/json" } } 
      ); 
    } 
  const CAMPAIGN_DEADLINE = new Date('2025-09-19T16:59:59Z'); 

  // Deadline check 
  const now = new Date(); 
  if (now >= CAMPAIGN_DEADLINE) { 
    return NextResponse.json({ success: false, reason: 'expired' }, { status: 403 }); 
  } 

  // Idempotent update 
  console.log(`Updating user ${user.id} -> isFromIKMExpo = true`); 
  const { error } = await supabase 
    .from('users') 
    .update({ isFromIKMExpo: true }) 
    .eq('id', user.id); 

  if (error) { 
    console.error('Database update failed:', error); 
    return NextResponse.json( 
      { success: false, reason: 'db_error', details: error.message }, 
      { status: 500 } 
    ); 
  } 

  console.log('Update succeeded. Returning success.'); 
  return NextResponse.json({ success: true }); 
}

