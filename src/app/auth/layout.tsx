import "../globals.css";
import { createClient } from "@/utils/supabase/server";

async function checkUser() {
    const supabase = createClient();
    const { data } = await (await supabase).auth.getUser();
    return data;
}

export default async function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <div
            className="min-h-screen"
            style={{
                background:
                    "linear-gradient(90deg,#11152E 0%, #342C6E 30%, #342C6E 51%, #11152E 79%)",
                minHeight: "100vh",
            }}
        >
            <div className="pt-28 lg:pt-12 w-full">{children}</div>
        </div>
    );
}
