import {createClient} from "@/utils/supabase/server";
import FormSubmissionWithUpload from "./page";
import {redirect} from "next/navigation";

export async function checkUser() {
	const supabase = createClient();
	const {data} = await (await supabase).auth.getUser();

	return data;
}

async function checkStatus(id: string) {
	const supabase = createClient();
	const {data} = await (await supabase)
		.from("users")
		.select("*")
		.eq("user_id", id)
		.single();

	return data;
}

export default async function RootLayout() {
	const data = await checkUser();

	if (!data?.user?.id) {
		redirect("/");
	} else {
		const status = await checkStatus(data.user.id);

		console.log("status", status);
		if (status.status == "SUBMITTED") {
			redirect("/dashboard");
		}
	}

	return (
		<div>
			<FormSubmissionWithUpload
				email={data?.user?.email || ""}
			></FormSubmissionWithUpload>
		</div>
	);
}
