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

        // Award points to referrer if referral code was used
        if (reqData.referralCode && reqData.referralCode.trim() !== "") {
            try {
                // Find the user who owns this referral code
                const { data: referrer, error: referrerError } = await (
                    await supabase
                )
                    .from("users")
                    .select("user_id, points")
                    .eq(
                        "referralCode",
                        reqData.referralCode.trim().toUpperCase()
                    )
                    .single();

                if (!referrerError && referrer) {
                    // Award 100 points to the referrer
                    const { error: pointsError } = await (
                        await supabase
                    )
                        .from("users")
                        .update({ points: referrer.points + 100 })
                        .eq("user_id", referrer.user_id);

                    if (pointsError) {
                        console.error(
                            "Error awarding referral points:",
                            pointsError
                        );
                        // Don't fail the submission if point award fails
                    } else {
                        console.log(
                            `Awarded 100 points to referrer ${referrer.user_id} for referral code ${reqData.referralCode}`
                        );
                    }
                }
            } catch (referralError) {
                console.error("Error processing referral:", referralError);
                // Don't fail the submission if referral processing fails
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
