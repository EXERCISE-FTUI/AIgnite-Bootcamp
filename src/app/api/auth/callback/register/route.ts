import {NextResponse} from "next/server";
// The client you created from the Server-Side Auth instructions
import {createClient} from "@/utils/supabase/server";

export async function GET(request: Request) {
	const {origin} = new URL(request.url);
	const supabase = await createClient();

	const {data: auth, error} = await (await supabase).auth.getUser();

	if (error) {
		return NextResponse.json({error: error.message}, {status: 500});
	}

	// check if the user is already registered
	const {data: user} = await (await supabase)
		.from("users")
		.select("*")
		.eq("user_id", auth?.user?.id)
		.single();

	if (user) {
		return NextResponse.redirect(`${origin}/dashboard`);
	}

	const {error: insertError} = await (await supabase).from("users").insert({
		email: auth.user?.email,
		user_id: auth.user?.id,
	});

	if (insertError) {
		return NextResponse.json({error: insertError.message}, {status: 500});
	}

	return NextResponse.redirect(`${origin}/dashboard`);
}
