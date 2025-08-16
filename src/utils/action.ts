"use client";

import {createClient} from "./supabase/client";

export async function signInWithGoogle() {
	const supabase = createClient();
	const auth_callback_url = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`;

	const {data, error} = await supabase.auth.signInWithOAuth({
		provider: "google",
		options: {redirectTo: auth_callback_url},
	});

	console.log(data, error);

	if (error) {
		console.error("Error signing in with Google:", error.message);
		return;
	}

	if (data?.url) {
		console.log("Redirecting to:", data.url);
		window.location.href = data.url; // Redirect the user
	}
}
