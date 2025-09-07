import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req) {
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
        // Points are now handled automatically by database triggers
        // - Referral points: awarded when form_submission is inserted with referralCode
        // - Submission points: awarded when form_submission is inserted
        console.log("Form submitted successfully, points awarded via triggers");

        return NextResponse.json(
            { data: "Submission successful" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
