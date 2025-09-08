import Footer from "@/components/footer/page";
import "./globals.css";
import Navbar from "@/components/navbar/page";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
    weight: "400",
    subsets: ["latin"],
});

import HelpButton from "@/components/helpButton/HelpButton";
import { createClient } from "@/utils/supabase/server";
import ReferralCapture from "@/components/ReferralCapture";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "AIgnite Bootcamp",
    description:
        "FREE 1 month bootcamp for all FTUI students from the 2025 batch",
};

async function checkUser() {
    const supabase = createClient();
    const { data } = await (await supabase).auth.getUser();
    return data;
}

export default async function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const data = await checkUser();

    return (
        <html lang="en">
            <body>
                <Navbar isLoggedIn={data.user ? true : false} />
                <div
                    className={`${inter.className} w-full`}
                    style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
                >
                    <ReferralCapture />
                    {children}
                    <Toaster />
                    <div className="pb-16" />
                    <Footer />
                    <HelpButton />
                </div>
            </body>
        </html>
    );
}
