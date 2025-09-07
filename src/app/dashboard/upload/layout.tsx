import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

async function checkUser() {
    const supabase = createClient();
    const { data } = await (await supabase).auth.getUser();

    return data;
}

async function checkStatus(id: string) {
    const supabase = createClient();
    const { data, error } = await (await supabase)
        .from("users")
        .select("*")
        .eq("user_id", id)
        .single();

    if (error) {
        console.log(
            "User not found in users table, will be created on registration"
        );
        return null;
    }

    return data;
}

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const data = await checkUser();

    if (!data?.user?.id) {
        redirect("/");
    } else {
        const status = await checkStatus(data.user.id);

        console.log("status", status);
        if (status.status == "SUBMITTED") {
            redirect("/dashboard");
        }
    }

    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
