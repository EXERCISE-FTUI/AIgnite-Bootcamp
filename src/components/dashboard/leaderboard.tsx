import { LeaderboardUser } from "@/app/dashboard/page";
import auraEffect from "@/../public/aura-effect.png";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";

async function fetchLeaderboard(): Promise<LeaderboardUser[]> {
    const supabase = createClient();

    try {
        const { data, error } = await (await supabase).rpc("get_leaderboard");

        if (error) {
            console.error("Error fetching leaderboard:", error);
            return [];
        }

        return data || [];
    } catch (error) {
        console.error("Error fetching leaderboard:", error);
        return [];
    }
}

// Leaderboard component (shared between logged and unlogged views)
export const LeaderboardSection = async (
    { hideDetails }: { hideDetails?: boolean } = { hideDetails: false }
) => {
    const leaderboardData = await fetchLeaderboard();
    // Show fallback message if no data
    if (!leaderboardData || leaderboardData.length === 0) {
        return (
            <div className="bg-gradient-to-bl from-[#10152C] to-[#6A4FCF] py-16">
                <div className="container mx-auto px-6">
                    <h2 className="text-5xl font-bold text-white text-center mb-12">
                        Leaderboard
                    </h2>
                    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-2xl mx-auto text-center">
                        <p className="text-gray-600">
                            No leaderboard data available yet. Complete your
                            submission to see the rankings!
                        </p>
                    </div>
                </div>
            </div>
        );
    }
    const getMedalIcon = (medal: string) => {
        let src = "";
        switch (medal) {
            case "gold":
                src = "/goldMedal.png";
                break;
            case "silver":
                src = "/silverMedal.png";
                break;
            case "bronze":
                src = "/bronzeMedal.png";
                break;
            default:
                return null;
        }
        return (
            <Image
                src={src}
                alt={`${medal} medal`}
                width={200}
                height={200}
                className="w-full absolute top-1 scale-[120%] aspect-square"
            />
        );
    };

    return (
        <div>
            <div
                className="w-full py-12 rounded-b-3xl flex flex-col items-center"
                style={{
                    background:
                        "radial-gradient(at -200% 200%, #6A4FCF, #10162C)",
                }}
            >
                <h2 className="lg:text-5xl text-4xl lg:mb-0 mb-8 font-bold text-white text-center">
                    Leaderboard
                </h2>
                {hideDetails && <div className="h-8"></div>}
                {!hideDetails && (
                    <Image
                        src={auraEffect}
                        alt="auraEffect"
                        width={500}
                        height={100}
                        className="object-cover aspect-contain w-auto opacity-70 pt-8 lg:block hidden"
                    />
                )}
                {/* Mobile view - 1st, 2nd, 3rd order */}
                <div className="flex flex-col justify-center items-center space-y-4 lg:hidden">
                    {[
                        leaderboardData.find(user => user.rank === 1),
                        leaderboardData.find(user => user.rank === 2),
                        leaderboardData.find(user => user.rank === 3),
                    ].map(user => {
                        if (!user) return null;
                        const medalType =
                            user.rank === 1
                                ? "gold"
                                : user.rank === 2
                                ? "silver"
                                : "bronze";
                        return (
                            <div
                                key={user.user_id}
                                className={cn(
                                    "flex flex-col items-center gap-2"
                                )}
                            >
                                <div className="w-20 aspect-square rounded-full bg-white flex items-center justify-center relative">
                                    {getMedalIcon(medalType)}
                                </div>

                                <p className="font-bold text-xl truncate w-40 text-white text-center">
                                    {user.full_name}
                                </p>
                                <div className="w-24 flex flex-col justify-center items-center text-white">
                                    <div className="bg-white tracking-wide backdrop-blur-3xl bg-opacity-20 px-4 truncate max-w-32 text-[#A259FF] py-1 rounded-full text-xl font-bold ">
                                        {user.points}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Desktop view - 2nd, 1st, 3rd order (podium style) */}
                <div className="hidden lg:flex flex-row justify-center items-end lg:space-x-20">
                    {[
                        leaderboardData.find(user => user.rank === 2),
                        leaderboardData.find(user => user.rank === 1),
                        leaderboardData.find(user => user.rank === 3),
                    ].map(user => {
                        if (!user) return null;
                        const medalType =
                            user.rank === 1
                                ? "gold"
                                : user.rank === 2
                                ? "silver"
                                : "bronze";
                        return (
                            <div
                                key={user.user_id}
                                className={cn(
                                    "flex flex-col items-center gap-2",
                                    user.rank === 1 && "mb-12"
                                )}
                            >
                                <div className="w-24 aspect-square rounded-full bg-white flex items-center justify-center relative">
                                    {getMedalIcon(medalType)}
                                </div>

                                <p className="font-bold text-xl truncate w-40 text-white text-center">
                                    {user.full_name}
                                </p>
                                <div
                                    className={`w-24 flex flex-col justify-center items-center text-white`}
                                >
                                    <div className="bg-white tracking-wide backdrop-blur-3xl bg-opacity-20 px-4 truncate max-w-32 text-[#A259FF] py-1 rounded-full text-xl font-bold ">
                                        {user.points}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            {!hideDetails && (
                <div className="bg-white p-6 max-w-4xl mx-auto">
                    <div className="space-y-4">
                        {leaderboardData.map((user, index) => (
                            <div
                                key={`${user.user_id}-${index}`}
                                className="flex items-center justify-between py-3 px-8 border-b border-gray-200 last:border-b-0"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="w-8 h-8 bg-gray-600 text-white rounded-full flex items-center justify-center text-lg font-bold">
                                        {user.rank}
                                    </div>
                                    <span className="font-medium text-lg text-gray-900">
                                        {user.full_name}
                                    </span>
                                </div>
                                <span className="text-purple-600 text-xl font-bold">
                                    {user.points}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
