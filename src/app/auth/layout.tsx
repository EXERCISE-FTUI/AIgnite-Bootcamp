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
        <div className="custom-gradient min-h-screen">
            <div className="pt-28 lg:pt-12 w-full">
                {children}
            </div>
        </div>
    );
}
