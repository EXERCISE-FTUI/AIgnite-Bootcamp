import {createClient} from "@/utils/supabase/server";
import {NextResponse} from "next/server";

export async function POST() {
	try {
		const supabase = createClient();

		const {error} = await (await supabase).auth.signOut();

		if (error) {
			return NextResponse.json({error: error.message}, {status: 500});
		}

		return NextResponse.json({data: "Logged out"}, {status: 200});
	} catch (error) {
		return NextResponse.json(
			{error: (error as Error).message},
			{status: 500}
		);
	}
}
