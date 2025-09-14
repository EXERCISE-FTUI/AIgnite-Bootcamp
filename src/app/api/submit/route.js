import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req) {
        // IKM Expo bonus logic
        const CAMPAIGN_DEADLINE = new Date('2025-09-19T16:59:59Z'); // 23:59 WIB
        const now = new Date();
    try {
        const reqData = await req.json();
        const supabase = createClient();

        const { data: auth, error: authError } = await (
            await supabase
        ).auth.getUser();

        if (authError) {
            throw new Error(authError.message);
        }

        // Insert form submission
        const { error } = await (await supabase)
            .from("form_submission")
            .insert([
                {
                    ...reqData,
                    user_id: auth?.user.id,
                },
            ]);

        if (error) {
            throw new Error(error.message);
        }

        // Update user status to SUBMITTED
        const { error: usersError } = await (await supabase)
            .from("users")
            .update({ status: "SUBMITTED" })
            .eq("user_id", auth?.user.id)
            .select();

        if (usersError) {
            throw new Error(usersError.message);
        }

        // Fetch user record for IKM Expo logic
        const { data: userRecord, error: userFetchError } = await (await supabase)
            .from("users")
            .select("isFromIKMExpo")
            .eq("user_id", auth?.user.id)
            .single();

        if (userFetchError) {
            throw new Error(userFetchError.message);
        }
        
        if (userRecord?.isFromIKMExpo && now < CAMPAIGN_DEADLINE) {
            // Call add_points RPC with 100 points
            const { error: pointsError } = await (await supabase)
                .rpc('add_points', {
                    target_user_id: auth?.user.id,
                    action_name: 'ikm_expo_bonus',
                    reference_id: null,
                    metadata: { points: 100 }
                });
            if (pointsError) {
                throw new Error(pointsError.message);
            }
        }

        return NextResponse.json(
            { data: "Submission successful" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
