import NormalWidthDashboard from "@/components/dashboard/normal_width_dashboard";
import SmallerWidthDashboard from "@/components/dashboard/smaller_width_dashboard";
import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
// import {useRouter} from "next/navigation";
// import {useEffect, useState} from "react";

async function fetchUserData() {
	const supabase = createClient();

	const {data: auth, error} = await (await supabase).auth.getUser();

	if (error) {
		return {error: error.message};
	}

	const {data: user, error: userError} = await (await supabase)
		.from("users")
		.select("*")
		.eq("user_id", auth?.user?.id)
		.single();

	if (userError) {
		return {error: userError.message};
	}

	return user;
}

export const dynamic = "force-dynamic";

const Dashboard = async () => {
	const userData = await fetchUserData();

	if (!userData || userData.error) {
		redirect("/");
	}

	return (
		<div className="w-full h-auto bg-white_2 lg:mt-20">
			<div className="hidden md:flex">
				<NormalWidthDashboard userData={userData} />
			</div>
			<div className="md:hidden">
				<SmallerWidthDashboard userData={userData} />
			</div>
		</div>
	);
};

export default Dashboard;
