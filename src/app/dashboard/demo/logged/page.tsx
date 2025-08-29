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

const userData = {
    id: 1,
    name: "John Doe",
    path: "path1",
    points: 700,
    referralCode: "BCX123",
};

const missions = [
    { id: 1, task: "Do a flip", points: 55 },
    { id: 2, task: "Do a flip", points: 55 },
    { id: 3, task: "Do a flip", points: 55 },
    { id: 4, task: "Do a flip", points: 55 },
    { id: 5, task: "Do a flip", points: 55 },
];

export default function LoggedPage() {
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
    return (
        <div>
            <div className="bg-white min-h-screen w-full p-14">
              <div className="bg-gradient-to-r from-[#10152C] via-[#1F225B] to-[#121212] h-screen w-full"></div>
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
                                        className={`w-12 h-12 rounded-full bg-white flex items-center justify-center mb-4 shadow-lg`}
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
            </div>>
        </div>
    );
}
