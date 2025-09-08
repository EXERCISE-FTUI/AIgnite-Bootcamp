import HomePage from "./home/page";
import { LeaderboardSection } from "@/components/dashboard/leaderboard";
import Image from "next/image";
import RegisterButton from "./components/RegisterButton";

export default function Home() {
    return (
        <>
            <HomePage />
            <div className="">
                {/* Merch Banner and Leaderboard */}
                <div className="p-2 lg:px-14">
                    <Image
                        src="/banner-merch.png"
                        alt="merch banner"
                        width={1000}
                        height={1000}
                        className="w-full h-1/2 object-cover rounded-md shadow-xl shadow-white/20"
                    />
                </div>
                <div className="bg-white pb-24">
                    <LeaderboardSection hideDetails={true} />

                    <RegisterButton />
                </div>
            </div>
        </>
    );
}
