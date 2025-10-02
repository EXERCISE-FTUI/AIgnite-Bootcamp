"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Missions } from "@/utils/information";
import { UserData } from "@/app/dashboard/page";
import { updateAnnouncementOpened } from "@/app/dashboard/actions";
import { CopyIcon, LinkIcon } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const RegisteredDashboard = (userData: UserData) => {
    const [copyTooltip, setCopyTooltip] = useState("");
    const [linkTooltip, setLinkTooltip] = useState("");
    const [announcementDialogOpen, setAnnouncementDialogOpen] = useState(false);
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
            <div className="w-full h-auto flex flex-col gap-12 p-4 lg:p-16 items-center pt-36 lg:pt-40 mb-20 relative overflow-hidden">
                <Image
                    src="/banner-merch.png"
                    alt="merch poster"
                    width={1000}
                    height={1000}
                    className="w-auto h-1/2 object-cover rounded-md shadow-xl shadow-white/20"
                />
                <div className="bg-black/20 backdrop-blur-md w-full lg:w-3/4 border border-white/20 rounded-lg h-auto lg:h-auto p-8 lg:p-12 flex flex-col justify-between">
                    {/* Top section with greeting and points */}
                    <div className="flex lg:flex-row flex-col justify-between items-start h-full lg:gap-0 gap-8">
                        <div className="flex flex-col justify-between w-full lg:w-1/2 h-full">
                            <div>
                                <h1 className="text-white text-4xl font-bold mb-1 truncate">
                                    Hi, {userData.firstName || "Nama"}!
                                </h1>
                                <span className="text-gray-300 text-xl">
                                    {userData.isAnnouncementOpened ? (
                                        userData.isAccepted ? (
                                            <>
                                                Selamat! kamu diterima di path{" "}
                                                <span className="font-bold text-white">
                                                    {userData.selectedPath}
                                                </span>
                                                !
                                            </>
                                        ) : (
                                            <>
                                                <span className="text-white">
                                                    Mohon maaf, kamu belum
                                                    diterima di path{" "}
                                                    {userData.selectedPath},
                                                    jangan pantang semangat!
                                                    Kamu masih bisa mendaftar
                                                    sebagai staff tetap EXERCISE
                                                    2026.
                                                </span>
                                            </>
                                        )
                                    ) : (
                                        <p className="font-bold pt-2">
                                            Cek Announcement Kamu Sekarang!
                                        </p>
                                    )}
                                </span>
                            </div>

                            {!userData.isAnnouncementOpened ? (
                                <Dialog
                                    open={announcementDialogOpen}
                                    onOpenChange={setAnnouncementDialogOpen}
                                >
                                    <DialogTrigger asChild>
                                        <Button className="bg-[#8B7CF6] w-fit hover:bg-[#7C3AED] hover:-translate-y-0.5 ease-in-out transform transition-all">
                                            Check Announcement
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="text-black max-md:w-[95%] max-md:rounded-lg">
                                        <DialogHeader>
                                            <DialogTitle className="text-2xl">
                                                {userData.isAccepted
                                                    ? "Congratulations!"
                                                    : "Thank You!"}
                                            </DialogTitle>
                                            <DialogDescription className="">
                                                {userData.isAccepted
                                                    ? "Selamat bergabung di AIgnite Bootcamp 2025!"
                                                    : "Terimakasih atas minat kamu pada bootcamp kami."}
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="">
                                            {userData.isAccepted ? (
                                                <>
                                                    <p>
                                                        Selamat! Kamu telah
                                                        diterima sebagai peserta
                                                        AIgnite Bootcamp 2025 di
                                                        path{" "}
                                                        <span className="font-bold">
                                                            {
                                                                userData.selectedPath
                                                            }
                                                        </span>
                                                        .<br></br>
                                                        <br></br>
                                                        <span>
                                                            Segera Join line
                                                            group untuk
                                                            informasi lebih
                                                            lanjut:
                                                        </span>
                                                    </p>

                                                    <p className="text-sm text-red-500 mt-2">
                                                        *ini adalah group baru,
                                                        berbeda dengan group
                                                        preliminary. WAJIB JOIN
                                                    </p>

                                                    {/* Desktop: Show QR Code */}
                                                    <div className="hidden lg:block">
                                                        <Image
                                                            alt="Line Group QR Code"
                                                            src="/line_group_diterima.jpg"
                                                            width={150}
                                                            height={150}
                                                            className="rounded-lg shadow-lg mx-auto"
                                                        />
                                                    </div>

                                                    {/* Mobile: Show Button */}
                                                    <div className="block lg:hidden">
                                                        <Button
                                                            className="bg-[#00C200] w-fit hover:bg-[#00C200] hover:-translate-y-0.5 ease-in-out transform transition-all"
                                                            onClick={() => {
                                                                const linkToOpen =
                                                                    "https://line.me/ti/g/8Jm6da5mn4";
                                                                window.open(
                                                                    linkToOpen,
                                                                    "_blank"
                                                                );
                                                            }}
                                                        >
                                                            <Image
                                                                alt="line"
                                                                src="/lineIcon.svg"
                                                                width={40}
                                                                height={40}
                                                            />
                                                            Join Participants
                                                            Group
                                                        </Button>
                                                    </div>

                                                    <p className="pt-4">
                                                        Sampai jumpa di Grand
                                                        Launching tanggal 4
                                                        Oktober 2025!
                                                    </p>
                                                </>
                                            ) : (
                                                <>
                                                    <p>
                                                        Setelah pertimbangan
                                                        yang sangat ketat, kami
                                                        belum bisa menawarkan
                                                        kamu tempat di bootcamp
                                                        kali ini. Jangan
                                                        berkecil hati, tetap
                                                        semangat dan terus asah
                                                        kemampuanmu!
                                                    </p>
                                                    <p className="pt-4 font-bold">
                                                        {" "}
                                                        <span>
                                                            Ini bukanlah akhir,
                                                            kami tunggu di Open
                                                            Recruitment Staff
                                                            EXERCISE 2026!
                                                        </span>
                                                    </p>
                                                </>
                                            )}
                                        </div>
                                        <DialogFooter>
                                            <Button
                                                onClick={async () => {
                                                    try {
                                                        await updateAnnouncementOpened();
                                                        setAnnouncementDialogOpen(
                                                            false
                                                        );
                                                    } catch (error) {
                                                        console.error(
                                                            "Error updating announcement:",
                                                            error
                                                        );
                                                    }
                                                }}
                                                className="bg-[#8B7CF6] hover:bg-[#7C3AED]"
                                            >
                                                Close
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            ) : (
                                <>
                                    {userData.isAccepted && (
                                        <>
                                            {/* Desktop: Show QR Code */}
                                            <div className="hidden lg:block">
                                                <div className="">
                                                    <p className="text-white text-lg mb-4">
                                                        Scan QR Code untuk Join
                                                        Participants Group
                                                    </p>
                                                    <Image
                                                        alt="Line Group QR Code"
                                                        src="/line_group_diterima.jpg"
                                                        width={200}
                                                        height={200}
                                                        className="rounded-lg shadow-lg"
                                                    />
                                                </div>
                                            </div>

                                            {/* Mobile: Show Button */}
                                            <div className="block lg:hidden">
                                                <Button
                                                    className="bg-[#00C200] w-fit hover:bg-[#00C200] hover:-translate-y-0.5 ease-in-out transform transition-all"
                                                    onClick={() => {
                                                        const linkToOpen =
                                                            "https://line.me/ti/g/8Jm6da5mn4";
                                                        window.open(
                                                            linkToOpen,
                                                            "_blank"
                                                        );
                                                    }}
                                                >
                                                    <Image
                                                        alt="line"
                                                        src="/lineIcon.svg"
                                                        width={40}
                                                        height={40}
                                                    />
                                                    Join Participants Group
                                                </Button>
                                            </div>
                                        </>
                                    )}
                                </>
                            )}
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
                        const isCompleted =
                            userData.completedMissions.includes(
                                mission.action_name || ""
                            ) && mission.action_name !== "referral_success";
                        return (
                            <div
                                key={mission.title}
                                className={`w-full flex cursor-default justify-between rounded-md items-center bg-[#11162F] px-4 py-2 ${
                                    isCompleted
                                        ? "opacity-40 cursor-not-allowed"
                                        : ""
                                }`}
                            >
                                <h3 className="text-lg lg:text-3xl text-white">
                                    {mission.title}
                                </h3>
                                <p
                                    className={`text-[#A259FF] text-lg lg:text-3xl`}
                                >
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
