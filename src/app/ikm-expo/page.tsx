import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import IkmExpoSuccessPage from "./_components/success";
import IkmExpoExpiredPage from "./_components/expired";

export default async function IkmExpoPage() {
    // Create Supabase client for server-side authentication
    const supabase = createClient();

    const {
        data: { user },
        error: userError,
    } = await (await supabase).auth.getUser();

    // Check if user is authenticated
    if (!user || userError) {
        redirect("/auth/login?returnTo=/ikm-expo");
    }

    // Check if user already claim the campaign
    const { data: userRecord } = await (await supabase)
        .from("users")
        .select("isFromIKMExpo")
        .eq("user_id", user.id)
        .single();

    if (userRecord?.isFromIKMExpo) {
        redirect("/dashboard");
    }

    // Check if campaign is still active
    const CAMPAIGN_DEADLINE = new Date("2025-09-19T16:59:59Z");
    const now = new Date();

    if (now >= CAMPAIGN_DEADLINE) {
        return <IkmExpoExpiredPage />;
    }

    // Update user's isFromIKMExpo status
    try {
        console.log(`Updating user ${user.id} -> isFromIKMExpo = true`);
        const { error } = await (await supabase)
            .from("users")
            .update({ isFromIKMExpo: true })
            .eq("user_id", user.id);

        if (error) {
            console.error("Database update failed:", error);
            redirect("/dashboard");
        }

        console.log("Update succeeded. Showing success page.");
        return <IkmExpoSuccessPage />;
    } catch (error) {
        console.error("Unexpected error:", error);
        return <IkmExpoExpiredPage />;
    }
}
