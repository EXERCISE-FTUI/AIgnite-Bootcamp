"use client";

import {useState} from "react";
import {useToast} from "@/hooks/use-toast";
import {ForgotPasswordForm} from "./_components/ForgotPasswordForm";
import {createClient} from "@/utils/supabase/client";

export default function LoginPage() {
	const [loading, setLoading] = useState(false);
	const {toast} = useToast();
	const [loginData, setLoginData] = useState({email: ""});
	const supabase = createClient();

	async function handleReset(e: React.FormEvent<HTMLFormElement>) {
		setLoading(true);
		e.preventDefault();
		const response = await supabase.auth.resetPasswordForEmail(
			loginData.email,
			{
				redirectTo: `${window.location.origin}/account/update-password`,
			}
		);

		if (response.error) {
			toast({
				title: "Reset password failed",
				variant: "destructive",
				description: response.error.message,
			});
		} else {
			toast({
				title: "Link sent!",
				description: "Please check your email for the reset link",
			});
		}
		setLoading(false);
	}

	return (
		<div className="mt-10 flex flex-col items-center min-h-screen">
			<h1 className="mt-36 text-purple_4 scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
				Password Reset
			</h1>
			<div className="flex w-full h-screen items-center -translate-y-40 justify-center">
				<ForgotPasswordForm
					handleReset={handleReset}
					setLoginData={setLoginData}
					loginData={loginData}
					loading={loading}
				/>
			</div>
		</div>
	);
}
