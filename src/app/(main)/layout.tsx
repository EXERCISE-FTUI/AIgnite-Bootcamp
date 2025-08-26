import "../globals.css";
import {createClient} from "@/utils/supabase/server";

export async function checkUser() {
    const supabase = createClient();
    const {data} = await (await supabase).auth.getUser();
    return data;
}

export default async function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <div
            style={{
                background:
                    "linear-gradient(180deg, #121212 0%, #1F225B 20.22%, #35386D 39.59%, #2B7696 55.12%, #1C465C 69.89%, #15394A 85.23%, #0D2734 100%)",
            }}
        >
            {children}
        </div>
    );
}
