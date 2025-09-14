import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function IkmExpoLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = createClient();

    // Check if user already claim the campaign
    const {
        data: { user },
    } = await (await supabase).auth.getUser();

    if (!user) {
        redirect("/auth/login?returnTo=/ikm-expo");
    }

    const { data: userRecord } = await (await supabase)
        .from("users")
        .select("isFromIKMExpo")
        .eq("id", user.id)
        .single();

    if (userRecord?.isFromIKMExpo) {
        redirect("/dashboard");
    }

    return <div>{children}</div>;
}
