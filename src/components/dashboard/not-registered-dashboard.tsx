"use client";

import { Button } from "@/components/ui/button";
import { Monitor, Settings, BarChart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const iconData = [
    { Icon: Monitor, label: "Monitor" },
    { Icon: Settings, label: "Settings" },
    { Icon: BarChart, label: "Bar Chart" },
];

export const NotRegisteredDashboard = () => {
    const router = useRouter();
    return (
        <div className="w-full bg-white">
            <div className="min-h-screen flex items-center justify-center">
                <div className="container mx-auto px-6 py-12 lg:px-12 lg:py-24">
                    <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-56">
                        <div className="space-y-6 text-center lg:text-left">
                            <h1 className="text-4xl lg:text-6xl font-sans">
                                <span className="text-black">Register </span>
                                <br />
                                <span className="font-bold text-[#11152E]">
                                    Bootcamp
                                </span>
                                <br />
                                11
                                <span className="text-black">Now!</span>
                            </h1>
                            <Button
                                className="bg-[#804AF2] hover:bg-[#702EFC] text-white px-8 py-3 rounded-lg font-medium"
                                onClick={() => router.push("/dashboard/upload")}
                            >
                                Join Now
                            </Button>
                        </div>

                        <div className="flex flex-col items-center space-y-8">
                            <div className="w-80 h-60 lg:w-96 lg:h-72 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center shadow-lg">
                                <Image
                                    src="/backgroundDashboard.png"
                                    alt="Bootcamp illustration"
                                    className="w-full h-full object-cover rounded-2xl"
                                    width={458}
                                    height={301}
                                />
                            </div>

                            <div className="flex space-x-12">
                                {iconData.map(({ Icon }, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col items-center"
                                    >
                                        <Icon className="w-8 h-8 text-black" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
