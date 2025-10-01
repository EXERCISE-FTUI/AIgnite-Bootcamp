import { createClient } from "@/utils/supabase/server";
import { NotRegisteredDashboard } from "@/components/dashboard/not-registered-dashboard";
import { FormData } from "./upload/_components/registration-form";
import { LeaderboardSection } from "@/components/dashboard/leaderboard";
import { RegisteredDashboard } from "@/components/dashboard/registered-dashboard";

export interface UserData extends FormData {
    points: number;
    code: string;
    error?: string;
    isFromIKMExpo: boolean;
    completedMissions: string[];
    isAccepted?: boolean;
    isAnnouncementOpened?: boolean;
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
        .select("points,code,isFromIKMExpo")
        .eq("user_id", auth.user.id)
        .single();

    if (userError) {
        console.error("User data fetch error:", userError);
        return { error: userError.message };
    }

    // Fetch form submission data if it exists
    const { data: formData, error: formError } = await (await supabase)
        .from("form_submission")
        .select("*, isAccepted, isAnnouncementOpened")
        .eq("user_id", auth.user.id)
        .maybeSingle(); // Use maybeSingle() instead of single() to handle no rows

    if (formError) {
        console.error("Form data fetch error:", formError);
        return { error: formError.message };
    }

    // If no form submission exists, create a basic structure
    if (!formData) {
        console.log("No form submission found for user");
        return {
            ...userData,
            user_id: auth.user.id,
        };
    }

    // Try to get all missions the user has completed
    let { data: completedMissions } = await (await supabase)
        .from("points_log")
        .select("action")
        .eq("user_id", auth.user.id);

    // flatten the missions and filter distinct
    if (completedMissions) {
        completedMissions = completedMissions.map(mission => mission.action);
        completedMissions = [...new Set(completedMissions)];
    }

    // Combine and flatten the data
    const combinedUser = {
        ...userData,
        ...formData,
        completedMissions,
        user_id: auth.user.id,
    };

    return combinedUser;
}

export const dynamic = "force-dynamic";

const Dashboard = async () => {
    const userData: UserData = await fetchUserData();

    // If user is logged in, show logged view
    if (userData.email && !userData.error) {
        return (
            <>
                <RegisteredDashboard {...userData} />
                <LeaderboardSection />
            </>
        );
    }

    // If user is not logged in, show unlogged view
    return (
        <>
            <NotRegisteredDashboard {...userData} />
            <LeaderboardSection />
        </>
    );
};

export default Dashboard;
