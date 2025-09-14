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
        .select("*")
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

    // Combine and flatten the data
    const combinedUser = {
        ...userData,
        ...formData,
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
