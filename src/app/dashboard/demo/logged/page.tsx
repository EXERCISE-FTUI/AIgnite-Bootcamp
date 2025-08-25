import { Button } from "@/components/ui/button";
import { Monitor, Settings, BarChart, Star, Medal, Trophy } from "lucide-react";
import Image from "next/image";

const topThreeData = [
    { id: 1, name: "John One", score: 900, position: 1, medal: "gold" },
    { id: 2, name: "John Two", score: 855, position: 2, medal: "silver" },
    { id: 3, name: "John Three", score: 700, position: 3, medal: "bronze" },
];

const lowerRankingsData = [
    { id: 4, name: "John Four", score: 695, rank: 4 },
    { id: 5, name: "John Four", score: 695, rank: 4 },
    { id: 6, name: "John Four", score: 695, rank: 4 },
    { id: 7, name: "John Four", score: 695, rank: 4 },
    { id: 8, name: "John Four", score: 695, rank: 4 },
    { id: 9, name: "John Four", score: 695, rank: 4 },
    { id: 10, name: "John Four", score: 695, rank: 4 },
];

const iconData = [
    { Icon: Monitor, label: "Monitor" },
    { Icon: Settings, label: "Settings" },
    { Icon: BarChart, label: "Bar Chart" },
];

export default function BootcampPage() {
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
            <Image src={src} alt={`${medal} medal`} width={48} height={48} />
        );
    };

    const getMedalBackground = (medal: string) => {
        return "bg-white";
    };

    const getPodiumHeight = (position: number) => {
        switch (position) {
            case 1:
                return "h-32";
            case 2:
                return "h-24";
            case 3:
                return "h-20";
            default:
                return "h-16";
        }
    };

    return (
        <div className="w-full bg-white">
            <div className="min-h-screen flex items-center justify-center">
                <div className="container mx-auto px-6 py-12 lg:px-12 lg:py-24">
                    <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-56">
                        <div className="space-y-6 text-center lg:text-left">
                            <h1 className="text-4xl lg:text-6xl font-sans">
                                <span className="text-black">Register </span>
                                <br />
                                <span className="font-bold text-blue-900">
                                    Bootcamp
                                </span>
                                <br />
                                <span className="text-black">Now!</span>
                            </h1>
                            <Button className="bg-[#804AF2] hover:bg-[#702EFC] text-white px-8 py-3 rounded-lg font-medium">
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

            <div className="bg-gradient-to-bl from-[#10152C] to-[#6A4FCF] py-16">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-white text-center mb-12">
                        Leaderboard
                    </h2>

                    <div className="flex justify-center items-end space-x-8 mb-12">
                        {[
                            topThreeData.find(user => user.position === 2),
                            topThreeData.find(user => user.position === 1),
                            topThreeData.find(user => user.position === 3),
                        ].map(user => {
                            if (!user) return null;
                            return (
                                <div
                                    key={user.id}
                                    className="flex flex-col items-center"
                                >
                                    <div
                                        className={`w-16 h-16 rounded-full ${getMedalBackground(user.medal)} flex items-center justify-center mb-4 shadow-lg`}
                                    >
                                        {getMedalIcon(user.medal)}
                                    </div>

                                    <p className="font-bold text-sm text-white text-center">
                                        {user.name}
                                    </p>
                                    <div
                                        className={` w-24 rounded-t-lg flex flex-col justify-center items-center text-white shadow-lg p-2`}
                                    >
                                        <div className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold mt-2">
                                            {user.score}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-2xl mx-auto">
                        <div className="space-y-4">
                            {lowerRankingsData.map((user, index) => (
                                <div
                                    key={`${user.id}-${index}`}
                                    className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="w-8 h-8 bg-gray-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                            {user.rank}
                                        </div>
                                        <span className="font-medium text-gray-900">
                                            {user.name}
                                        </span>
                                    </div>
                                    <span className="text-purple-600 font-bold">
                                        {user.score}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
