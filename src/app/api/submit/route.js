import {createClient} from "@/utils/supabase/server";
import {NextResponse} from "next/server";

export async function POST(req) {
	try {
		const reqData = await req.json();
		const supabase = createClient();

		const {data: auth, error: authError} = await (
			await supabase
		).auth.getUser();

		if (authError) {
			throw new Error(authError.message);
		}

		const {error} = await (await supabase).from("form_submission").insert([
			{
				...reqData,
				user_id: auth?.user.id,
			},
		]);

		if (error) {
			throw new Error(error.message);
		}

		// update users
		const {error: usersError} = await (await supabase)
			.from("users")
			.update({status: "SUBMITTED"})
			.eq("user_id", auth?.user.id)
			.select();

		if (usersError) {
			throw new Error(usersError.message);
		}

		return NextResponse.json({data: "Logged out"}, {status: 200});
	} catch (error) {
		return NextResponse.json({error: error.message}, {status: 500});
	}
}
