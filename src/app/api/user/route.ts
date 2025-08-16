import {createClient} from "@/utils/supabase/server";
import {NextResponse} from "next/server";

export async function GET() {
	try {
		const supabase = createClient();

		const {data: auth, error} = await (await supabase).auth.getUser();

		if (error) {
			return NextResponse.json({error: error.message}, {status: 500});
		}

		const {data: user, error: userError} = await (await supabase)
			.from("users")
			.select("*")
			.eq("user_id", auth?.user?.id)
			.single();

		console.log("user", user);

		if (userError) {
			return NextResponse.json({error: userError.message}, {status: 500});
		}

		return NextResponse.json({data: user}, {status: 200});
	} catch (error) {
		return NextResponse.json(
			{error: (error as Error).message},
			{status: 500}
		);
	}
}
