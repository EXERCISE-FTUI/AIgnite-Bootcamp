import {createClient} from "@/utils/supabase/server";
import {NextResponse} from "next/server";

export async function POST(req: Request) {
	try {
		const {email, password} = await req.json();
		const supabase = createClient();

		const {data: auth, error} = await (
			await supabase
		).auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			return NextResponse.json({error: error.message}, {status: 500});
		}

		return NextResponse.json({data: auth}, {status: 200});
	} catch (error) {
		return NextResponse.json(
			{error: (error as Error).message},
			{status: 500}
		);
	}
}
