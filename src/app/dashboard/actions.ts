"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateAnnouncementOpened() {
    const supabase = createClient();

    const { data: auth, error: authError } = await (
        await supabase
    ).auth.getUser();

    if (authError || !auth?.user) {
        throw new Error("User not authenticated");
    }

    const { error } = await (await supabase)
        .from("form_submission")
        .update({ isAnnouncementOpened: true })
        .eq("user_id", auth.user.id);

    if (error) {
        console.error("Error updating announcement status:", error);
        throw new Error("Failed to update announcement status");
    }

    // Revalidate the dashboard page to refresh the data
    revalidatePath("/dashboard");

    return { success: true };
}
