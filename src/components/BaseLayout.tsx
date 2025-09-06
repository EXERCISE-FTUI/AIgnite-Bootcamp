import Footer from "@/components/footer/page";
import Navbar from "@/components/navbar/page";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import HelpButton from "@/components/helpButton/HelpButton";

const inter = Inter({
    weight: "400",
    subsets: ["latin"],
});

export default function BaseLayout({
    children,
    isLoggedIn,
    gradientClass,
    gradientStyle,
}: {
    children: React.ReactNode;
    isLoggedIn: boolean;
    gradientClass?: string;
    gradientStyle?: React.CSSProperties;
}) {
    return (
        <>
            <Navbar isLoggedIn={isLoggedIn} />
            <div
                className={`${inter.className} pt-28 lg:pt-12 w-full ${gradientClass ?? ""}`}
                style={gradientStyle}
            >
                {children}
                <Toaster />
                <div className="pb-16" />
                <Footer />
                <HelpButton />
            </div>
        </>
    );
}
