"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { LineGroupLink } from "@/utils/information";

interface UserData {
    firstName: string;
    lastName: string;
    department: string;
    major: string;
    npm: string;
    selectedPath: string;
    referralCode: string;
}

interface RegisteredDashboardProps {
    userData: UserData;
}

export const RegisteredDashboard = ({ userData }: RegisteredDashboardProps) => {
    return (
        <div className="w-full h-auto flex flex-col gap-12 p-16 items-center pt-36 mb-20 relative overflow-hidden">
            <Image
                src="/merchPoster.png"
                alt="merch poster"
                width={100}
                height={100}
                className="w-full h-60 object-cover bg-white"
            />
            <div className="bg-black/20 backdrop-blur-md w-3/4 border border-white/20 rounded-lg h-60 p-12 flex flex-col justify-between">
                {/* Top section with greeting and points */}
                <div className="flex justify-between items-start h-full">
                    <div className="flex flex-col justify-between w-1/2 h-full">
                        <div>
                            <h1 className="text-white text-4xl font-bold mb-1 truncate">
                                Hi, {userData.firstName || "Nama"}!
                            </h1>
                            <span className="text-gray-300 text-xl">
                                Kamu terdaftar di path{" "}
                                <span className="font-bold text-white">
                                    {userData.selectedPath}
                                </span>
                                !
                            </span>
                        </div>

                        <Button
                            className="bg-[#00C200] w-fit hover:bg-[#00C200] hover:-translate-y-0.5 ease-in-out transform transition-all"
                            onClick={() => {
                                window.open(LineGroupLink, "_blank");
                            }}
                        >
                            <Image
                                alt="line"
                                src="/lineIcon.svg"
                                width={40}
                                height={40}
                            />
                            Join Line Group
                        </Button>
                    </div>
                    <div className="text-right">
                        <span className="text-[#8B7CF6] text-4xl font-bold">
                            {userData.npm || "700"}
                        </span>
                        <span className="text-white text-lg ml-1">Points</span>
                    </div>
                </div>
            </div>

            <div
                className="w-full h-full absolute top-0 left-0 z-[-1]"
                style={{
                    background:
                        "linear-gradient(119.97deg, #10152C 7.46%, #1F225B 44.79%, #121212 85.66%)",
                }}
            ></div>
            <div
                className="bg-white w-full aspect-square absolute bottom-0 z-[-1]"
                style={{
                    clipPath: "ellipse(50% 9% at 50% 100%)",
                }}
            ></div>
        </div>
    );
};
