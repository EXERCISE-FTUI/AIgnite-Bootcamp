"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { LineGroupLink, Missions } from "@/utils/information";
import { UserData } from "@/app/dashboard/page";
import { CopyIcon, LinkIcon } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const RegisteredDashboard = (userData: UserData) => {
    const [copyTooltip, setCopyTooltip] = useState("");
    const [linkTooltip, setLinkTooltip] = useState("");
    const { toast } = useToast();

    const copyReferralCode = async () => {
        try {
            await navigator.clipboard.writeText(userData.code);
            toast({
                title: "Copied!",
                description: "Referral code copied to clipboard",
            });
        } catch (err) {
            console.error("Failed to copy referral code:", err);
            toast({
                title: "Failed to copy",
                description: "Please try again",
                variant: "destructive",
            });
        }
    };

    const copyShareableLink = async () => {
        const baseUrl =
            typeof window !== "undefined"
                ? window.location.origin
                : "https://bootcamp.exerciseftui.com";
        const shareableLink = `${baseUrl}/?referral=${userData.code}`;
        try {
            await navigator.clipboard.writeText(shareableLink);
            toast({
                title: "Copied!",
                description: "Shareable link copied to clipboard",
            });
        } catch (err) {
            console.error("Failed to copy shareable link:", err);
            toast({
                title: "Failed to copy",
                description: "Please try again",
                variant: "destructive",
            });
        }
    };

    return (
        <>
            <div className="w-full h-auto flex flex-col gap-12 p-4 lg:p-16 items-center pt-36 mb-20 relative overflow-hidden">
                <Image
                    src="/merchPoster.png"
                    alt="merch poster"
                    width={100}
                    height={100}
                    className="w-full h-60 object-cover bg-white"
                />
                <div className="bg-black/20 backdrop-blur-md w-full lg:w-3/4 border border-white/20 rounded-lg h-auto lg:h-60 p-8 lg:p-12 flex flex-col justify-between">
                    {/* Top section with greeting and points */}
                    <div className="flex lg:flex-row flex-col justify-between items-start h-full lg:gap-0 gap-8">
                        <div className="flex flex-col justify-between w-full lg:w-1/2 h-full">
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
                        <div className="text-right flex flex-col justify-between h-full self-end">
                            <div>
                                <span className="text-[#8B7CF6] text-6xl font-bold">
                                    {userData.points}
                                </span>
                                <span className="text-white text-3xl ml-1">
                                    Points
                                </span>
                            </div>
                            <div className="text-white">
                                <p className="text-xl">Referral Code</p>
                                <div className="flex h-10 gap-1">
                                    <div className="bg-white rounded-md text-black w-fit p-1 px-4 font-bold text-2xl">
                                        {userData.code}
                                    </div>
                                    <div className="relative">
                                        <button
                                            onClick={copyReferralCode}
                                            onMouseEnter={() =>
                                                setCopyTooltip("visible")
                                            }
                                            onMouseLeave={() =>
                                                setCopyTooltip("")
                                            }
                                            className="bg-purple-600 rounded-md h-full w-12 flex items-center justify-center hover:bg-purple-700 transition-colors"
                                        >
                                            <CopyIcon size={20} />
                                        </button>
                                        {copyTooltip && (
                                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-black text-white text-sm rounded whitespace-nowrap z-10">
                                                Copy code
                                            </div>
                                        )}
                                    </div>
                                    <div className="relative">
                                        <button
                                            onClick={copyShareableLink}
                                            onMouseEnter={() =>
                                                setLinkTooltip("visible")
                                            }
                                            onMouseLeave={() =>
                                                setLinkTooltip("")
                                            }
                                            className="bg-purple-800 rounded-md h-full w-12 flex items-center justify-center hover:bg-purple-900 transition-colors"
                                        >
                                            <LinkIcon size={20} />
                                        </button>
                                        {linkTooltip && (
                                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-black text-white text-sm rounded whitespace-nowrap z-10">
                                                Copy shareable link
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
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

            <div className="w-full h-auto flex flex-col max-w-4xl mx-auto mb-20 lg:p-0 p-4">
                <h2 className="text-4xl font-bold text-black pb-4">Missions</h2>
                <div className="flex flex-col gap-2">
                    {" "}
                    {Missions.map(mission => {
                        return (
                            <div
                                key={mission.title}
                                className="w-full flex cursor-default justify-between rounded-md items-center bg-[#11162F] px-4 py-2"
                            >
                                <h3 className="text-lg lg:text-3xl text-white">
                                    {mission.title}
                                </h3>
                                <p className="text-[#A259FF] text-lg lg:text-3xl">
                                    {mission.points && mission.points > 0
                                        ? `${mission.points} Points`
                                        : ""}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};
