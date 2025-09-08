"use client";
import { useRouter } from "next/navigation";

export default function RegisterButton() {
    const router = useRouter();

    return (
        <div className="w-full flex justify-center pt-16 md:pt-12 lg:mt-12 lg:p-0 p-4">
            <button
                className="z-10 group w-[50vh] flex items-center gap-3 justify-center px-16 py-3 rounded-xl border-2 border-white hover:border-[#0A192F] shadow-lg hover:scale-[120%] duration-100
                bg-gradient-to-r from-[#0A192F] to-[#002A5E]
                hover:from-white hover:to-white"
                onClick={() => router.push("/dashboard")}
            >
                <div className="text-center text-white text-xl font-bold group-hover:text-[#002A5E]">
                    Start Earning Points
                </div>
            </button>
        </div>
    );
}
