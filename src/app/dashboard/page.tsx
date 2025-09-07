import { createClient } from "@/utils/supabase/server";
import { RegisteredDashboard } from "@/components/dashboard/registered-dashboard";
import { NotRegisteredDashboard } from "@/components/dashboard/not-registered-dashboard";
import { FormData } from "./upload/_components/registration-form";
import { LeaderboardSection } from "@/components/dashboard/leaderboard";

export interface UserData extends FormData {
    points: number;
    referralCode: string;
    error?: string;
}

export interface LeaderboardUser {
    user_id: string;
    full_name: string;
    points: number;
    rank: number;
}

async function fetchUserData() {
    const supabase = createClient();

    const { data: auth, error } = await (await supabase).auth.getUser();

    if (error) {
        return { error: error.message };
    }

    // If no user is authenticated, return null (not an error)
    if (!auth?.user) {
        return null;
    }

    // Fetch user data from users table (referralCode, points, etc.)
    const { data: userData, error: userError } = await (await supabase)
        .from("users")
        .select("points,referralCode")
        .eq("user_id", auth.user.id)
        .single();

    if (userError) {
        return { error: userError.message };
    }

    // Fetch form submission data if it exists
    const { data: formData, error: formError } = await (await supabase)
        .from("form_submission")
        .select("*")
        .eq("user_id", auth.user.id)
        .single();

    if (formError) {
        return { error: formError.message };
    }

    // Combine and flatten the data
    const combinedUser = {
        ...userData,
        ...formData,
        user_id: auth.user.id,
    };

    console.log("user", combinedUser);
    return combinedUser;
}

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

export const dynamic = "force-dynamic";

const Dashboard = async () => {
    const userData: UserData = await fetchUserData();
    const leaderboardData = await fetchLeaderboard();
    console.log("userData", userData);
    console.log("leaderboardData", leaderboardData);

    // If user is logged in, show logged view
    if (userData && !userData.error) {
        return (
            <>
                <RegisteredDashboard {...userData} />
                <LeaderboardSection leaderboardData={leaderboardData} />
            </>
        );
    }

    // If user is not logged in, show unlogged view
    return (
        <>
            <NotRegisteredDashboard />
            <LeaderboardSection leaderboardData={leaderboardData} />
        </>
    );
};

export default Dashboard;
